const MongoAPI = require("../Services/MongoService")

async function getAllEvent(data) {
    return await MongoAPI.readDocuments("event", {});
}

module.exports = { getAllEvent };
