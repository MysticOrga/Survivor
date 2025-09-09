const MongoAPI = require("../Services/MongoService");
const client = require("../Config/db");

exports.getFilter = async () => {
    return MongoAPI.readDocuments('filter');
}

exports.addSector = async (filter) => {
    const db = client.db("ClientDB");

    return db.collection('filter').updateMany({ filter_name: 'sector'}, {
        $push: {
            filter: filter
        }
    })
}