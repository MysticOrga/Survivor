const client = require("./Config/db");
const DBClient = require("./Config/db");

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const db = client.db("Survivor");
        const obj = { test: "toto" };
        await db.collection("user").insertOne(obj, function(err, db) {
            if (err)
                console.log("err");
            else
                console.log("good");
        })
        console.log("Succesful Connection");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
