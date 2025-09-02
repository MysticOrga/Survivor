const client = require("./Src/Config/db");
const json = {
    "Name": "EcoFarm",
    "Email": "contact@ecofarm.example",
    "Phone": "+33 6 12 34 56 78",
    "Address": "12 Rue des Champs, 75001 Paris, France",
    "Legal_status": "SARL",
    "Description": "Plateforme d'agriculture urbaine connectée pour optimiser la production locale.",
    "created_at": "2025-09-02T10:30:00Z",
    "Ext_url": [
        "https://ecofarm.example",
        "https://github.com/ecofarm"
    ],
    "Project_status": "active",
    "needs": 250000,
    "sector": "AgriTech",
    "Maturity": "Seed",
    // "funder": [
    //     {
    //         "id": 101,
    //         "name": "Investisseurs SAS",
    //         "type": "Equity",
    //         "contribution": 150000,
    //         "contact": "invest@investisseurs.example"
    //     },
    //     {
    //         "id": 102,
    //         "name": "Subvention Publique",
    //         "type": "Grant",
    //         "contribution": 50000,
    //         "contact": "contact@subvention.example"
    //     }
    // ]
}

async function insertStartup() {
    let data = json;
    try {
        await client.connect();
        const db = client.db("Survivor");
        const col = db.collection("startup");

        if (Array.isArray(data)) {
            const res = await col.insertMany(data);
            console.log('Inserted startups:', data);
        } else {
            const res = await col.insertOne(data);
            console.log('Inserted statups:', data);
        }
    } catch (err) {
        console.error('Erreur DB:', err.message || err);
    } finally {
        try { await client.close(); } catch (e) {}
    }
};

async function getAllStartups() {
    try {
        await client.connect();
        const db = client.db("Survivor");
        const col = db.collection("startup");
        const startups = await col.find({}).toArray();
        console.log("Found startups:", startups);
        return startups;
    } catch (err) {
        console.error("Erreur DB:", err.message || err);
        return [];
    } finally {
        try { await client.close(); } catch (e) {}
    }
}

insertStartup().catch(console.dir);

getAllStartups().then(startups => {
    console.log("Total startups:", startups.length);
}).catch(console.error);
