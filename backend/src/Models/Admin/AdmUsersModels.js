const client = require("../../Config/db");
const { ObjectId } = require("mongodb");

async function getAllUsers() {
    const db = client.db("ClientDB");
    const col = db.collection("user");
    return await col.find().toArray();
}

async function getUsersById(id) {
    const db = client.db("ClientDB");
    const col = db.collection("user");
    return await col.findOne({ _id: new ObjectId(id) });
}

async function createUsers(data) {
    const db = client.db("ClientDB");
    const col = db.collection("user");
    const result = await col.insertOne(data);
    return { _id: result.insertedId, ...data };
}

async function updateUsers(id, data) {
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

async function deleteUsers(id) {
    const db = client.db("ClientDB");
    const col = db.collection("user");
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}

module.exports = { getAllUsers, getUsersById, createUsers, updateUsers, deleteUsers };
