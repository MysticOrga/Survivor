const Startup = require("../Models/StartupModels");
const Project = require("../Models/ProjectModels");
const Channel = require("../Models/ChannelModels");
const express = require("express");
const { ObjectId } = require("mongodb");
const auth = require("../Middlewares/auth");
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

router.get("/:id/projects", async (req, res) => {
    const filter = { startup_id: new ObjectId(req.params.id) };
    const data = await Project.getStartupProjects(filter)
    res.json(data);
})

router.get("/:id/channels", auth('founder'), async (req, res) => {
    const filter = { startup_id: new ObjectId(req.params.id) };
    console.log(filter);
    const channels = await Channel.getChannels(filter, 'investor_name', 'investor_id');
    res.json(channels);
})

module.exports = router;