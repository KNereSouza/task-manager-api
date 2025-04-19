import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";

// Load environment variables from .env file
configDotenv();

const databaseUrl = process.env.DB_URL;
const client = new MongoClient(databaseUrl);

/**
 * Connects to the MongoDB database.
 * This function establishes a connection to the MongoDB server using the URL provided in the environment variables.
 * @returns { Promise<MongoClient> } A promise that resolves to the connected MongoDB client.
 * @throws  { Error } If the connection to the database fails.
 */
async function connectToDatabase() {
  try {
    await client.connect(); // Attempt to connect to the MongoDB server
    console.log("Connected to the database");
    return client; // Return the connected client
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

/**
 * Retrieves the MongoDB database instance.
 * This function returns the database instance specified in the environment variables.
 * @returns { Db } The MongoDB database instance.
 * @throws  { Error } If the client is not connected to the database.
 */
function getDatabase() {
  console.log("Getting database: ", process.env.DB_NAME); // Log the database name being accessed
  return client.db(process.env.DB_NAME); // Return the database instance
}

export { connectToDatabase, getDatabase };
