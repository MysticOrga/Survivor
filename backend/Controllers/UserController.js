const User = require("../Models/UserModels");
const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
    console.log(req.body);
    const token = await User.loginUser(req.body.email, req.body.password);
    if (!token) {
        res.send("invalid authorization")
    } else {
        res.json({ token : token})
    }
})

module.exports = router;