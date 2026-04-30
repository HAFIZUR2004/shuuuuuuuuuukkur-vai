import { MongoClient } from 'mongodb';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

// একটি টেস্ট Base64 ইমেজ (1x1 পিক্সেল ট্রান্সপারেন্ট PNG)
const TEST_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

async function migrateTestimonials() {
  let client: MongoClient | null = null;
  
  try {
    console.log('📡 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('testimonials');
    
    // 1. সব ডকুমেন্টে image ফিল্ড যোগ করুন (যেখানে নেই)
    console.log('📝 Adding image field to all documents...');
    const updateResult = await collection.updateMany(
      { image: { $exists: false } },
      { $set: { image: "" } }
    );
    
    console.log(`✅ Updated ${updateResult.modifiedCount} documents`);
    
    // 2. বর্তমান ডকুমেন্টগুলো দেখান
    const testimonials = await collection.find({}).toArray();
    console.log(`\n📊 Total testimonials: ${testimonials.length}`);
    
    testimonials.forEach(t => {
      console.log(`\n📋 ID: ${t._id}`);
      console.log(`   Name: ${t.name}`);
      console.log(`   Has image: ${!!t.image}`);
      console.log(`   Image length: ${t.image?.length || 0}`);
    });
    
    // 3. (অপশনাল) একটি নির্দিষ্ট টেস্টিমোনিয়ালে টেস্ট ইমেজ যোগ করুন
    if (testimonials.length > 0 && !testimonials[0].image) {
      console.log(`\n🖼️ Adding test image to first testimonial...`);
      await collection.updateOne(
        { _id: testimonials[0]._id },
        { $set: { image: TEST_IMAGE } }
      );
      console.log(`✅ Test image added to: ${testimonials[0].name}`);
    }
    
    console.log('\n✨ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Connection closed');
    }
  }
}

migrateTestimonials();
// ,,,