const client = require("../../Config/db");
const { ObjectId } = require("mongodb");

async function getAllNews() {
    const db = client.db("ClientDB");
    const col = db.collection("new");
    return await col.find().toArray();
}

async function getNewsById(id) {
    const db = client.db("ClientDB");
    const col = db.collection("new");
    return await col.findOne({ _id: new ObjectId(id) });
}

async function createNews(data) {
    const db = client.db("ClientDB");
    const col = db.collection("new");
    const result = await col.insertOne(data);
    return { _id: result.insertedId, ...data };
}

async function updateNews(id, data) {
    const db = client.db("ClientDB");
    const col = db.collection("new");
    const result = await col.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
    if (result.matchedCount === 0) {
        return null;
    }
    return await col.findOne({ _id: new ObjectId(id) });
}

async function deleteNews(id) {
    const db = client.db("ClientDB");
    const col = db.collection("new");
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}

module.exports = { getAllNews, getNewsById, createNews, updateNews, deleteNews };
