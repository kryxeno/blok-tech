require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.lidqbyt.mongodb.net/?retryWrites=true&w=majority`;
var client;

const connectDatabase = async () => {
  client = new MongoClient(uri, {
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

const insertOne = async (database, collection, data) => {
  try {
    const db = client.db(database);
    const response = await db.collection(collection).insertOne(data);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const insertMany = async (database, collection, data) => {
  try {
    const db = client.db(database);
    const response = await db
      .collection(collection)
      .insertMany(data, function (err, result) {
        if (err) {
          console.error("Error inserting documents:", err);
          return;
        }

        console.log(`${result.insertedCount} documents inserted.`);
      });
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAllData = async (database, collection, sort) => {
  try {
    const db = client.db(database);
    const data = await db.collection(collection).find().sort(sort).toArray();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateOne = async (database, collection, field, update) => {
  try {
    const db = client.db(database);
    const updateObject = {};
    updateObject[field] = update;
    console.log(updateObject);
    const response = await db
      .collection(collection)
      .updateOne(
        { _id: new ObjectId("646ffa73ddb70af17807e4e7") },
        { $push: updateObject }
      );
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteOne = async (database, collection, field, update) => {
  try {
    const db = client.db(database);
    const updateObject = {};
    updateObject[field] = update;
    console.log(updateObject);
    const response = await db
      .collection(collection)
      .updateOne(
        { _id: new ObjectId("646ffa73ddb70af17807e4e7") },
        { $pull: updateObject }
      );
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  connectDatabase,
  insertOne,
  insertMany,
  updateOne,
  getAllData,
  deleteOne,
};
