import { Db, MongoClient } from "mongodb";
import { getMongoUri, MONGODB_DB } from "./dbConfig";

const options = {
  serverSelectionTimeoutMS: 5000,
};

type MongoGlobal = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let productionClientPromise: Promise<MongoClient> | undefined;

function createClientPromise() {
  const client = new MongoClient(getMongoUri(), options);
  return client.connect();
}

export function getMongoClient() {
  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = globalThis as MongoGlobal;

    if (!globalWithMongo._mongoClientPromise) {
      globalWithMongo._mongoClientPromise = createClientPromise();
    }

    return globalWithMongo._mongoClientPromise;
  }

  if (!productionClientPromise) {
    productionClientPromise = createClientPromise();
  }

  return productionClientPromise;
}

export async function getDatabase(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(MONGODB_DB);
}

const clientPromise = {
  then: <TResult1 = MongoClient, TResult2 = never>(
    onfulfilled?:
      | ((value: MongoClient) => TResult1 | PromiseLike<TResult1>)
      | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ) => getMongoClient().then(onfulfilled, onrejected),
  catch: <TResult = never>(
    onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ) => getMongoClient().catch(onrejected),
  finally: (onfinally?: (() => void) | null) =>
    getMongoClient().finally(onfinally),
  [Symbol.toStringTag]: "Promise",
} as Promise<MongoClient>;

export default clientPromise;
