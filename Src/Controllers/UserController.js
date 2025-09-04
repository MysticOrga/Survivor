const Users = require("../Models/UserModels");
const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    const data = await Users.getAllUser();
    res.json(data);
})

router.get("/:id", async (req, res) => {
    const data = await Users.getUserId(req.params.id);

    if (data.lenght != 0)
        res.json(data);
    else
        res.send("startup not find");
})

module.exports = router;
