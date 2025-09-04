const {ObjectId} = require("mongodb");
const client = require("../Config/db");

async function getAllUser(data) {
    try {
        await client.connect();
        const db = client.db("ClientDB");
        const col = db.collection("new");
        return await col.find({}).toArray();
    } finally {
        client.close();
    }
}

async function getUserId(id) {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("user");
        return await col.findOne( {_id: new ObjectId(id) } );
    } finally {
        console.log("fini1");
    }
}

module.exports = { getAllUser, getUserId };