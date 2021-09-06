// Import mongodb.
const mongodb = require("mongodb");

// --- dotenv configuration ---
const dotenv = require("dotenv");
dotenv.config();

// Mongo Client.
const MongoClient = mongodb.MongoClient;

let _db;

const mongodbClient = (callback) => {
  MongoClient.connect(process.env.MONGO_DB_URL)
    .then((client) => {
      console.log("DB Connected ...");
      _db = client.db();
      callback(client);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "Database connection not found.";
};

exports.mongodbClient = mongodbClient;
exports.getDb = getDb;
