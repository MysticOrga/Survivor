const Startup = require("../Models/StartupModels");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await Startup.getAllStartups();
    res.json(data);
})

router.get("/filter", async (req, res) => {
    try {
        const filters = {};

        if (req.query.sector)
            filters.sector = req.query.sector;
        if (req.query.country)
            filters.country = req.query.country;
        if (req.query.stage)
            filters.stage = req.query.stage;
        const data = await Startup.getStartupByFilter(filters);
        if (data.length > 0)
            res.json(data);
        else
            res.status(404).send("No startups found for given filters");
    } catch (err) {
        res.status(500).send("Server error: " + err.message);
    }
});

router.get("/:id", async (req, res) => {
    const data = await Startup.getStartup(req.params.id);

    if (data.length != 0)
        res.json(data);
    else
        res.send("startup not find")
})

router.post("/", async (req, res) => {
    console.log(req);
    res.send("ouais oauis")
})

module.exports = router;