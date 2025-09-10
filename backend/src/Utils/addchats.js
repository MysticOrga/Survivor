const client = require("../Config/db");
const MongoAPI = require("../Services/MongoService");

async function run() {
    try {
        await client.connect();
        const db = client.db("ClientDB");
        const startup = await db.collection('startup').findOne({name: 'HealthBridge'})
        const investor = await db.collection('user').findOne({ name: 'lucas' })
        const channel = {
            startup_name: startup.name,
            startup_id: startup._id,
            investor_name: investor.name,
            investor_id: investor._id,
            chats: [
                {
                    sender_name: investor.name,
                    sender_id: investor._id,
                    message: "hello i'm leukos i would love to invest in your project 'project'",
                    send_at: new Date()
                }
            ]
        }
        await db.createCollection('channel');
        await db.collection('channel').insertOne(channel);
        console.log(channel);
        console.log(startup);
        console.log(investor);
    } finally {
        await client.close();
    }
}

run();
