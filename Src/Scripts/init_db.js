const { insertStartup, getAllStartups } = require("../Services/startupServices")

const startup = {
    Name: "EcoFarm",
    Email: "contact@ecofarm.example",
    Phone: "+33 6 12 34 56 78",
    Address: "12 Rue des Champs, 75001 Paris, France",
    Legal_status: "SARL",
    Description: "Plateforme d'agriculture urbaine connectée pour optimiser la production locale.",
    created_at: "2025-09-02T10:30:00Z",
    Ext_url: [
        "https://ecofarm.example",
        "https://github.com/ecofarm"
    ],
    Project_status: "active",
    needs: 250000,
    sector: "AgriTech",
    Maturity: "Seed"
};

(async () => {
    await insertStartup(startup);
    const startups = await getAllStartups();
    console.log("Total startups:", startups.length);
})();
