const client = require("../Config/db");

async function insertStartup(data) {
    try {
        await client.connect();
        const db = client.db("Survivor");
        const col = db.collection("startup");

        if (Array.isArray(data)) {
            return await col.insertMany(data);
        } else {
            return await col.insertOne(data);
        }
    } finally {
        await client.close();
    }
}

async function getAllStartups() {
    try {
        await client.connect();
        const db = client.db("Survivor");
        const col = db.collection("startup");
        return await col.find({}).toArray();
    } finally {
        await client.close();
    }
}

module.exports = { insertStartup, getAllStartups };