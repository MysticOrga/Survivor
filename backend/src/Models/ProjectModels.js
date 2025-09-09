const { ObjectId } = require("mongodb");
const MongoAPI = require("../Services/MongoService");
const client = require("../Config/db");
const { DB_NAME } = require("../Config/env");

exports.createProject = async (data) => {
    return MongoAPI.createDocument("project", data);
}

exports.getProjects = async () => {

    return MongoAPI.readDocuments('project', {});
}

exports.getStartupProjects = async (filter) => {
    return MongoAPI.readDocuments("project", filter);
}

exports.getProject = async (id, public) => {
    const filter = { _id: new ObjectId(id) };
    const db = client.db(DB_NAME);
    const views = public ? { public_view: 1 } : { private_views: 1 };

    return await db.collection('project').findOneAndUpdate(filter,
        { $inc : views},
        { returnDocument: "after"}
    )
}

exports.updateProject = async (filter, data) => {
    return MongoAPI.updateDocument("project", filter, data);
}

exports.deleteProject = async (filter) => {
    return MongoAPI.deleteDocuments("project", filter);
}

exports.getStartupProjects = async (filter) => {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("project");
        return await col.find(filter).toArray();
    } finally {
        console.log("fini");
    }
}
