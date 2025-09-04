const Event = require("../Models/EventsModels");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await Event.getAllEvent();
    res.json(data);
})

router.get("/:id", async (req, res) => {
    const data = await Event.getEventId(req.params.id);

    if (data.length != 0)
        res.json(data);
    else
        res.send("startup not find")
})

module.exports = router;
