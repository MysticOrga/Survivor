const MongoAPI = require("../Services/MongoService")

async function getAllEvent(data) {
    return await MongoAPI.readDocuments("new", {});
}

module.exports = { getAllEvent };
