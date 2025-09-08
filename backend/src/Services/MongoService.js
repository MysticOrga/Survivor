const client = require("../Config/db");
const { DB_NAME } = require("../Config/env");

exports.createDocument = async (collection, data) => {
    const db = client.db(DB_NAME);

    if (Array.isArray(data)) {
        await db.collection(collection).insertMany(data);
    } else {
        await db.collection(collection).insertOne(data);
    }
}

exports.readDocuments = async (collection, filter) => {
    const db = client.db(DB_NAME);
    return await db.collection(collection).find(filter).toArray();
}

exports.updateDocument = async (collection, filter, data) => {
    const db = client.db(DB_NAME);
    console.log(data);
    if (Array.isArray(data)) {
        db.collection(collection).updateMany(filter, {
            $set: data
        })
    } else {
        console.log(await db.collection(collection).updateOne(filter, {
            $set: data
        }));
    }
}

exports.incDocFields = async (collection, filter, data) => {
    const db = client.db(DB_NAME);

    if (Array.isArray(data)) {
        db.collection(collection).updateMany(filter, {
            $inc: {
                data
            }
        })
    } else {
        db.collection(collection).updateOne(filter, {
            $inc: {
                data
            }
        })
    }
}

exports.renameDocFields = async (collection, filter, data) => {
    const db = client.db(DB_NAME);

    if (Array.isArray(data)) {
        db.collection(collection).updateMany(filter, {
            $rename: {
                data
            }
        })
    } else {
        db.collection(collection).updateOne(filter, {
            $rename: {
                data
            }
        })
    }
}

exports.unsetDocFields = async (collection, filter, data) => {
    const db = client.db(DB_NAME);

    if (Array.isArray(data)) {
        db.collection(collection).updateMany(filter, {
            $unset: {
                data
            }
        })
    } else {
        db.collection(collection).updateOne(filter, {
            $unset: {
                data
            }
        })
    }
}

exports.mulDocFields = async (collection, filter, data) => {
    const db = client.db(DB_NAME);

    if (Array.isArray(data)) {
        db.collection(collection).updateMany(filter, {
            $mul: {
                data
            }
        })
    } else {
        db.collection(collection).updateOne(filter, {
            $mul: {
                data
            }
        })
    }
}

exports.deleteDocuments = async (collection, filter) => {
    const db = client.db(DB_NAME);
    db.collection(collection).deleteMany(filter);
}
