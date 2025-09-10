const client = require("../Config/db");

async function run() {
    try {
        await client.connect();
        const db = client.db("ClientDB");
        await db.collection("filter").updateMany({ filter_name: "sector"}, {
            $push: {
                filter: "testFilter"
            }
        })
        // let sector = []
        // const startup = await db.collection('startup').find({}).toArray();

        // for (const it of startup) {
        //     if (!sector.includes(it.sector)) {
        //         sector.push(it.sector);
        //     }
        // }
        // await db.createCollection("filter");
        // await db.collection('filter').insertOne({
        //     filter_name: "sector",
        //     filter: sector
        // });
        // console.log(sector);
    } finally {
        await client.close();
    }
}

run();