const Startup = require("../Models/StartupModels");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await Startup.getAllStartups();
    res.json(data);
})

router.post("/", async (req, res) => {
    console.log(req);
    res.send("ouais oauis")
})

module.exports = router;