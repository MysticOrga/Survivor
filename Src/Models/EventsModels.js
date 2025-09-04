const MongoAPI = require("../Services/MongoService")
const client = require("../Config/db");
const { ObjectId } = require("mongodb");

async function getAllEvent(data) {
    return await MongoAPI.readDocuments("event", {});
}

async function getEventId(id) {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("event");
        // return await col.findOne( { _id, const name = new type(arguments);})
        return await col.find( {_id: new ObjectId(id)} ).toArray();
    } finally {
        console.log("fini");
    }
}

module.exports = { getAllEvent, getEventId };
