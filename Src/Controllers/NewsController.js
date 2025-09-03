const News = require("../Models/NewsModels");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await News.getAllNews();
    res.json(data);
})

module.exports = router;