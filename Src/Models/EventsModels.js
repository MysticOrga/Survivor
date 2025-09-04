const client = require("../Config/db");
const { ObjectId } = require("mongodb");

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

async function getEventId(id) {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("new");
        // return await col.findOne( { _id, const name = new type(arguments);})
        return await col.findOne( {_id: new ObjectId(id)} );
    } finally {
        console.log("fini");
    }
}

module.exports = { getAllEvent, getEventId };
