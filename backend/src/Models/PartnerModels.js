const MongoAPI = require("../Services/MongoService");

exports.getPartners = async () => {
    return await MongoAPI.readDocuments('partner', {});
}