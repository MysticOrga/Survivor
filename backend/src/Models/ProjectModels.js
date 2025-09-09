const { ObjectId } = require("mongodb");
const MongoAPI = require("../Services/MongoService");

exports.createProject = async (data) => {
    return MongoAPI.createDocument("project", data);
}

exports.getProjects = async () => {
    return MongoAPI.readDocuments('project', {});
}

exports.getStartupProjects = async (filter) => {
    return MongoAPI.readDocuments("project", filter);
}

exports.getProject = async (id) => {
    const filter = { _id: new ObjectId(id) };
    return MongoAPI.readDocuments('project', filter);
}

exports.updateProject = async (filter, data) => {
    return MongoAPI.updateDocument("project", filter, data);
}

exports.deleteProject = async (filter) => {
    return MongoAPI.deleteDocuments("project", filter);
}