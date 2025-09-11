const client = require("../Config/db");

async function run() {
    try {
        await client.connect();
        const db = client.db("ClientDB");
        await db.collection('project').updateMany({}, {
            $set : {
                public_view: 0,
                private_views: 0,
            }
        })
    } finally {
        await client.close();
    }
}

run();