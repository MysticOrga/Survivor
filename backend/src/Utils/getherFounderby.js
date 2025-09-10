const client = require("../Config/db");
const { DB_NAME, CLIENT_API_KEY } = require("../Config/env");

async function run() {
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const startups = await db.collection('startup').find({}).toArray();
        const founders = await db.collection('user').find({ role: 'founder'}).toArray();

        for (const startup of startups) {
            for (const founder of founders) {
                let resp = await fetch(`https://api.jeb-incubator.com/startups/${startup.id}/founders/${founder.founder_id}/image`, {
                    headers: {
                        'accept': 'application/json',
                        'X-Group-Authorization': CLIENT_API_KEY
                    }
                })
                if (resp.status == 200) {
                    await db.collection('user').updateOne({ founder_id: founder.founder_id}, {
                        $set: {
                            startup_id: startup._id
                        }
                    })
                    console.log("startup : " + startup._id + " founder : " + founder._id)
                }
            }
        }
    } finally {
        await client.close();
        console.log("fini");
    }
}

run();