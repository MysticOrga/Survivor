const { ObjectId } = require("mongodb");
const client = require("../Config/db");

async function insertStartup(data) {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("startup");

        if (Array.isArray(data)) {
            return await col.insertMany(data);
        } else {
            return await col.insertOne(data);
        }
    } finally {
        console.log("fini")
    }
}

async function getStartup(id)
{
    try {
        const db = client.db("ClientDB");
        const col = db.collection("startup");

        return await col.find({ _id : new ObjectId(id)}).toArray();
    } finally {
        console.log("fini")
    }
}

async function getAllStartups() {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("startup");
        return await col.find({}).toArray();
    } finally {
        console.log("fini")
    }
}

module.exports = { insertStartup, getAllStartups, getStartup };