const { ObjectId } = require("mongodb");
const MongoAPI = require("../Services/MongoService")

async function insertStartup(data) {
    return await MongoAPI.createDocument("startup", data);
}

async function getStartup(id)
{
    const filter = {
        _id: new ObjectId(id)
    };

    return await MongoAPI.readDocuments("startup", filter);
}

async function getAllStartups() {
    return await MongoAPI.readDocuments("startup", {});
}

module.exports = { insertStartup, getAllStartups, getStartup };