const client = require("../Config/db");
const crypt = require("bcrypt");
const { SALTROUND, PASSWORD, DB_NAME } = require("../Config/env");

const user = {
    "email": "toto@example.com",
    "name": "toto",
    "role": "admin",
    "founder_id": "null",
    "investor_id": "null",
}

async function run() {
    try {
        client.connect();
        const db = client.db(DB_NAME);
        const hash = await crypt.hash(PASSWORD.toString(), SALTROUND);

        await db.collection("user").insertOne({ ...user, password : hash });
        console.log("hashed password :" + hash);
    } finally {
        await client.close();
    }
}

run()