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

router.get("/users", authAPI(keyType), async (req, res) => {
    const data = await MongoAPI.readDocuments("user", {});
    res.json(data);
})

router.get("/startups", authAPI(keyType), async (req, res) => {
    const data = await MongoAPI.readDocuments("startup", {});
    res.json(data);
})

router.get("/news", authAPI(keyType), async (req, res) => {
    const data = await MongoAPI.readDocuments("new", {});
    res.json(data);
})

router.get("/events", authAPI(keyType), async (req, res) => {
    const data = await MongoAPI.readDocuments("event", {});
    res.json(data);
})

router.get("/user/:id", authAPI(keyType), async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};
    const data = await MongoAPI.readDocuments("user", filter);
    res.json(data);
})

router.get("/startup/:id", authAPI(keyType), async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};
    const data = await MongoAPI.readDocuments("startup", filter);
    res.json(data);
})

router.get("/new/:id", authAPI(keyType), async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};
    const data = await MongoAPI.readDocuments("new", filter);
    res.json(data);
})

router.get("/event/:id", authAPI(keyType), async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};
    const data = await MongoAPI.readDocuments("event", filter);
    res.json(data);
})

router.put("/user/:id", authAPI(keyType), (req, res) => {
    const data = req.body;
    console.log(data);
    const filter = { _id: new ObjectId(req.params.id)};
    MongoAPI.updateDocument("user", filter, data);
    res.send("user succesfully modified");
})

router.put("/startup/:id", authAPI(keyType), (req, res) => {
    const data = req.body;
    const filter = { _id: new ObjectId(req.params.id)};
    MongoAPI.updateDocument("startup", filter, data);
})

router.put("/event/:id", authAPI(keyType), (req, res) => {
    const data = req.body;
    const filter = { _id: new ObjectId(req.params.id)};
    MongoAPI.updateDocument("event", filter, data);
})

router.put("/new/:id", authAPI(keyType), (req, res) => {
    const data = req.body;
    const filter = { _id: new ObjectId(req.params.id)};
    MongoAPI.updateDocument("new", filter, data);
})

router.delete("/user/:id", authAPI(keyType), (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};

    MongoAPI.deleteDocuments("user", filter);
})

router.delete("/startup/:id", authAPI(keyType), (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};

    MongoAPI.deleteDocuments("startup", filter);
})

router.delete("/event/:id", authAPI(keyType), (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};

    MongoAPI.deleteDocuments("event", filter);
})

router.delete("/new/:id", authAPI(keyType), (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};

    MongoAPI.deleteDocuments("new", filter);
})

module.exports = router;