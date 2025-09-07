const MongoAPI = require("./MongoService");
const { DEV_API_KEY } = require("../Config/env");
const authAPI = require("../Middlewares/APIKey");
const express = require("express");
const router = express.Router();
const keyType = "dev";
const User = require("../Models/UserModels");
const { ObjectId } = require("mongodb");

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

router.get("/users", async (req, res) => {
    const data = await MongoAPI.readDocuments("user", {});
    res.json(data);
})

router.get("/startups", async (req, res) => {
    const data = await MongoAPI.readDocuments("startup", {});
    res.json(data);
})

router.get("/news", async (req, res) => {
    const data = await MongoAPI.readDocuments("new", {});
    res.json(data);
})

router.get("/events", async (req, res) => {
    const data = await MongoAPI.readDocuments("event", {});
    res.json(data);
})

router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};
    const data = await MongoAPI.readDocuments("user", filter);
    res.json(data);
})

router.get("/startups/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};
    const data = await MongoAPI.readDocuments("startup", filter);
    res.json(data);
})

router.get("/news/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};
    const data = await MongoAPI.readDocuments("new", filter);
    res.json(data);
})

router.get("/events/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};
    const data = await MongoAPI.readDocuments("event", filter);
    res.json(data);
})

module.exports = router;