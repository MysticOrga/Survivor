const router = require("express").Router();
const { getAllStartups } = require("../Services/startupServices");

router.get("/startup", (req, res) => {
    res.send("toto");
});

module.exports = router