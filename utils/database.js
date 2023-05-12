require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.lidqbyt.mongodb.net/?retryWrites=true&w=majority`;

const connectDatabase = async () => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  console.log("Connected to database");
  return client;
};

const insertOne = async (client, collection, data) => {
  const database = client.db();
  const response = await database.collection(collection).insertOne(data);
  return response;
};

const getAllData = async (client, database, collection, sort) => {
  const db = client.db(database);
  const data = await db.collection(collection).find().sort(sort).toArray();
  return data;
};

module.exports = { connectDatabase, insertOne, getAllData };
