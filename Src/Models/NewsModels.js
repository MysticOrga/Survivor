const { ObjectId } = require("mongodb");
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

async function getNewsId(id) {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("new");
        return await col.findOne( {_id: new ObjectId(id)});
    } finally {
        console.log("fini1");
    }
}

module.exports = { getAllNews, getNewsId };