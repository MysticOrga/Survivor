const Event = require("../Models/EventsModels");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await Event.getAllEvent();
    res.json(data);
})

module.exports = router;
