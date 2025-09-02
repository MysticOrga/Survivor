require("dotenv").config();
const {MongoClient, ServerApiVersion} = require("mongodb");
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD
const uri = `mongodb+srv://${user}:${password}@survivorcluster.tcmtz43.mongodb.net/?retryWrites=true&w=majority&appName=SurvivorCluster`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports = client;