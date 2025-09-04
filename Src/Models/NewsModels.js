const MongoAPI = require("../Services/MongoService")


async function getAllNews(data) {
    return await MongoAPI.readDocuments("new", {});
}

module.exports = { getAllNews };