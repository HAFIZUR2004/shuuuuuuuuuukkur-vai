export const MONGODB_DB = process.env.MONGODB_DB || "growbusinessDB";

export function getMongoUri() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured. Add it to .env.local or your deployment environment.",
    );
  }

  return uri;
}
