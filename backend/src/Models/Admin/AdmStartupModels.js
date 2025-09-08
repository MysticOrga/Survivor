const client = require("../../Config/db");
const { ObjectId } = require("mongodb");

async function getAllStartup() {
    const db = client.db("ClientDB");
    const col = db.collection("statup");
    return await col.find().toArray();
}

async function getStartupById(id) {
    const db = client.db("ClientDB");
    const col = db.collection("startup");
    return await col.findOne({ _id: new ObjectId(id) });
}

async function createStartup(data) {
    const db = client.db("ClientDB");
    const col = db.collection("startup");
    const result = await col.insertOne(data);
    return { _id: result.insertedId, ...data };
}

async function updateStartup(id, data) {
    const db = client.db("ClientDB");
    const col = db.collection("statup");
    const result = await col.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
    if (result.matchedCount === 0) {
        return null;
    }
    return await col.findOne({ _id: new ObjectId(id) });
}

async function deleteStartup(id) {
    const db = client.db("ClientDB");
    const col = db.collection("startup");
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}

module.exports = { getAllStartup, getStartupById, createStartup, updateStartup, deleteStartup };
