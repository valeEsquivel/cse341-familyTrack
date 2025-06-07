const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require("mongodb").MongoClient;

let database;

const initDB = (callback) => {
  if (database) {
    console.log("Database already initialized!");
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client;
      console.log("Database connected!");
      callback(null, database);
    })
    .catch((err) => {
      console.error("Database connection failed!", err);
      callback(err);
    });
};

const getDB = () => {
  if (!database) {
    throw new Error("Database not initialized. Call initDB first.");
  }
  return database;
};

module.exports = {
  initDB,
  getDB,
};
