const News = require("../Models/NewsModels");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await News.getAllNews();
    res.json(data);
})

router.get("/:id", async (req, res) => {
    const data = await News.getNewsId(req.params.id);

    if (data.length != 0)
        res.json(data);
    else
        res.send("startup not find")
})

module.exports = router;