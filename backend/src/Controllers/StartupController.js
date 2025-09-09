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
        for (const [key, value] of Object.entries(req.query)) {
            if (key === "country") {
                filters["address"] = { $regex: value + "$", $options: "i" };
            } else if (key === "sector" || key === "maturity") {
                filters[key] = { $regex: "^" + value + "$", $options: "i" };
            } else {
                filters[key] = value;
            }
        }
        const data = await Startup.getStartupByFilter(filters);
        if (data.length > 0)
            res.json(data);
        else
            res.status(404).send("No startups found for this filters");
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