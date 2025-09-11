const client = require("../../Config/db");
const { ObjectId } = require("mongodb");

async function getAllInvestisor() {
    const db = client.db("ClientDB");
    const col = db.collection("investisor");
    return await col.find().toArray();
}

async function getInvestisorById(id) {
    const db = client.db("ClientDB");
    const col = db.collection("investisor");
    return await col.findOne({ _id: new ObjectId(id) });
}

async function createInvestisor(data) {
    const db = client.db("ClientDB");
    const col = db.collection("investisor");
    const result = await col.insertOne(data);
    return { _id: result.insertedId, ...data };
}

async function updateInvestisor(id, data) {
    const db = client.db("ClientDB");
    const col = db.collection("investisor");
    const result = await col.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
    if (result.matchedCount === 0) {
        return null;
    }
    return await col.findOne({ _id: new ObjectId(id) });
}

async function deleteInvestisor(id) {
    const db = client.db("ClientDB");
    const col = db.collection("investisor");
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}

module.exports = { getAllInvestisor, getInvestisorById, createInvestisor, updateInvestisor, deleteInvestisor };
