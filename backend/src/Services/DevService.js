const MongoAPI = require("./MongoService");
const { DEV_API_KEY } = require("../Config/env");
const authAPI = require("../Middlewares/APIKey");
const express = require("express");
const router = express.Router();
const keyType = "dev";
const User = require("../Models/UserModels");

router.post("/user", authAPI(keyType), (req, res) => {
    const user = req.body;
    User.registerUser(user);
    res.json({
        msg: "user succesfully register",
        user: user
    });
})

router.post("/event", authAPI(keyType), (req, res) => {
    MongoAPI.createDocument("event", req.body);
})

router.post("/new", authAPI(keyType), (req, res) => {
    MongoAPI.createDocument("new", req.body);
})

router.post("/startup", authAPI(keyType), (req, res) => {
    MongoAPI.createDocument("startup", req.body);
})
