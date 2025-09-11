const client = require("../../Config/db");
const { ObjectId } = require("mongodb");

async function getAllPartner() {
    const db = client.db("ClientDB");
    const col = db.collection("user");
    return await col.find().toArray();
}

async function getPartnerById(id) {
    const db = client.db("ClientDB");
    const col = db.collection("user");
    return await col.findOne({ _id: new ObjectId(id) });
}

async function createPartner(data) {
    const db = client.db("ClientDB");
    const col = db.collection("user");
    const result = await col.insertOne(data);
    return { _id: result.insertedId, ...data };
}

async function updatePartner(id, data) {
    const db = client.db("ClientDB");
    const col = db.collection("user");
    const result = await col.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
    if (result.matchedCount === 0) {
        return null;
    }
    return await col.findOne({ _id: new ObjectId(id) });
}

async function deletePartner(id) {
    const db = client.db("ClientDB");
    const col = db.collection("user");
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}

module.exports = { getAllPartner, getPartnerById, createPartner, updatePartner, deletePartner };
