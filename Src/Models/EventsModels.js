const client = require("../Config/db");

async function getAllEvent(data) {
    try {
        await client.connect();
        const db = client.db("ClientDB");
        const col = db.collection("event");
        return await col.find({}).toArray();
    } finally {
        await client.close();
    }
}

module.exports = { getAllEvent };
