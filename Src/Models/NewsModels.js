const MongoAPI = require("../Services/MongoService")
const { ObjectId } = require("mongodb");
const client = require("../Config/db");

async function getAllNews(data) {
    return await MongoAPI.readDocuments("new", {});
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