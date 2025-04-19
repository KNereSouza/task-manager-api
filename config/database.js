import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";

// Load environment variables from .env file
configDotenv();

const databaseUrl = process.env.DB_URL;
const client = new MongoClient(databaseUrl);

/**
 * Connects to the MongoDB database.
 * @returns {Promise<MongoClient>}
 */
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");
    return client;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

function getDatabase() {
  console.log("Getting database: ", process.env.DB_NAME);
  return client.db(process.env.DB_NAME);
}

export { connectToDatabase, getDatabase };
