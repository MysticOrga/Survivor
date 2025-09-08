const { ObjectId } = require("mongodb");
const MongoAPI = require("../Services/MongoService");

exports.getProjects = async () => {
    return MongoAPI.readDocuments('project', {});
}

exports.getProject = async (id) => {
    const filter = { _id: new ObjectId(id) };
    return MongoAPI.readDocuments('project', filter);
}