const { ObjectId } = require("mongodb");
const client = require("../Config/db");
const MongoAPI = require("../Services/MongoService")

async function insertStartup(data) {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("startup");

        if (Array.isArray(data)) {
            data = data.map(d => ({ ...d, views: 0 }));
            return await col.insertMany(data);
        } else {
            // return await col.insertOne(data);
            return await col.insertOne({ ...data, views: 0});
        }
    } finally {
        console.log("fini1")
    }
}

async function getStartup(id) {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("startup");

        return await col.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $inc: { views: 1 } },
            { returnDocument: "after" }
        );
    } finally {
        console.log("fini4");
    }
}

async function getAllStartups() {
    return await MongoAPI.readDocuments("startup", {});
}

module.exports = { insertStartup, getAllStartups, getStartup };