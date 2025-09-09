const Startup = require("../Models/StartupModels");
const Project = require("../Models/ProjectModels");
const Channel = require("../Models/ChannelModels");
const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await Startup.getAllStartups();
    res.json(data);
})

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

router.get("/:id/channels", async (req, res) => {
    const filter = { startup_id: new ObjectId(req.params.id) };
    console.log(filter);
    const channels = await Channel.getChannels(filter, 'investor_name', 'investor_id');
    res.json(channels);
})

router.post("/", async (req, res) => {
    console.log(req);
    res.send("ouais oauis")
})

module.exports = router;