// Import mongodb.
const mongodb = require("mongodb");

// Mongo Client.
const MongoClient = mongodb.MongoClient;

let _db;

const mongodbClient = (callback) => {
  MongoClient.connect(
    "mongodb+srv://root:root@cluster0.1xjeb.mongodb.net/shop?retryWrites=true&w=majority"
  )
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
