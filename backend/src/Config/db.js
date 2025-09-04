const { MONGO_URL } = require("./env");
const {MongoClient, ServerApiVersion} = require("mongodb");

const MongoCli = new MongoClient(MONGO_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports = MongoCli;