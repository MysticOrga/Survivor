const Users = require("../Models/UserModels");
const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/auth");

router.post("/login", async (req, res) => {
    const token = await Users.loginUser(req.body.email, req.body.password);
    if (!token) {
        res.status(401).json({ error: "Unauthorized"});
    } else {
        res.json({ token : token})
    }
})

router.get("/", auth("investisor"), async(req, res) => {
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