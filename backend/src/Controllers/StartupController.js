const Startup = require("../Models/StartupModels");
const Project = require("../Models/ProjectModels");
const express = require("express");
const { ObjectId } = require("mongodb");
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
            } else {
                filters[key] = value;
            }
        }
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

router.get("/:id/projects", async (req, res) => {
    const filter = { startup_id: new ObjectId(req.params.id) };
    const data = await Project.getStartupProjects(filter)
    res.json(data);
})

router.post("/", async (req, res) => {
    console.log(req);
    res.send("ouais oauis")
})

module.exports = router;