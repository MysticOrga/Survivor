const client = require("../Config/db");

async function getAllNews(data) {
    try {
        await client.connect();
        const db = client.db("ClientDB");
        const col = db.collection("new");
        return await col.find({}).toArray();
    } finally {
        client.close()
    }
}

module.exports = { getAllNews };