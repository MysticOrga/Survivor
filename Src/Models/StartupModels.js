const { ObjectId } = require("mongodb");
const client = require("../Config/db");

async function insertStartup(data) {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("startup");

        if (Array.isArray(data)) {
            data = data.map(d => ({ ...d, views: 0 }));
            return await col.insertMany(data);
        } else {
            // return await col.insertOne(data);
            return await col.insertOne({ ...data, views: 0});
        }
    } finally {
        console.log("fini1")
    }
}

// async function getStartup(id)
// {
//     try {
//         const db = client.db("ClientDB");
//         const col = db.collection("startup");

//         return await col.find({ _id : new ObjectId(id)}).toArray();
//     } finally {
//         console.log("fini2")
//     }
// }

async function getAllStartups() {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("startup");
        return await col.find({}).toArray();
    } finally {
        console.log("fini3")
    }
}

async function getStartup(id) {
    try {
        const db = client.db("ClientDB");
        const col = db.collection("startup");

        return await col.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $inc: { views: 1 } },
            { returnDocument: "after" }
        );
    } finally {
        console.log("fini4");
    }
}

module.exports = { insertStartup, getAllStartups, getStartup };