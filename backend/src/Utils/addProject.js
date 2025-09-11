const client = require("../Config/db");
const { DB_NAME } = require("../Config/env");

const project = {
    "name": "project",
    "description": "project for place holder before we get real project",
    "created_at" : new Date(),
    "project_status" : "idea",
    "needs" : 100000,
    "sector" : "fintech",
}

async function run() {
    try {
        client.connect();
        const db = client.db(DB_NAME);
        const startup = await db.collection("startup").find({}).toArray();

        if (startup.length) {
            for (const it of startup) {
                await db.collection("project").insertOne({ ...project, startup_id: it._id});
            }
        }
        console.log(startup);
    } finally {
        await client.close();
    }
}

run();