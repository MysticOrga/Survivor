const MongoAPI = require("./MongoService");
const client = require("../Config/db");
const { CLIENT_BASE_API_URL, CLIENT_API_KEY, DB_NAME } = require("../Config/env");
const express = require("express");
const { response } = require("../server");
const router = express.Router();
const keyType = "client";

router.post('/startups', async (req, res) => {
    let upddates = {
        modifiedCount: 0,
        matchedCount: 0,
        upsertedCount: 0
    };
    const response = await fetch(CLIENT_BASE_API_URL + '/startups?skip=0&limit=100', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-Group-Authorization': CLIENT_API_KEY
        },
    })
    const result = await response.json();
    for (const data of result) {
        let filter = { id: data.id };
        let document = await client.db(DB_NAME).collection("startup").updateOne(filter, {
            $set: data
        })
        upddates.modifiedCount += document.modifiedCount;
        upddates.matchedCount += document.matchedCount;
        upddates.upsertedCount += document.upsertedCount;
    }
    res.json(upddates);
})

router.post('/investors', async (req, res) => {
    let upddates = {
        modifiedCount: 0,
        matchedCount: 0,
        upsertedCount: 0
    };
    const response = await fetch(CLIENT_BASE_API_URL + '/investors?skip=0&limit=100', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-Group-Authorization': CLIENT_API_KEY
        },
    })
    const result = await response.json();
    for (const data of result) {
        let filter = { id: data.id };
        let document = await client.db(DB_NAME).collection("investor").updateOne(filter, {
            $set: data
        })
        upddates.modifiedCount += document.modifiedCount;
        upddates.matchedCount += document.matchedCount;
        upddates.upsertedCount += document.upsertedCount;
    }
    res.json(upddates);
})

router.post('/partners', async (req, res) => {
    let upddates = {
        modifiedCount: 0,
        matchedCount: 0,
        upsertedCount: 0
    };
    const response = await fetch(CLIENT_BASE_API_URL + '/partners?skip=0&limit=100', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-Group-Authorization': CLIENT_API_KEY
        },
    })
    const result = await response.json();
    for (const data of result) {
        let filter = { id: data.id };
        let document = await client.db(DB_NAME).collection("partner").updateOne(filter, {
            $set: data
        })
        upddates.modifiedCount += document.modifiedCount;
        upddates.matchedCount += document.matchedCount;
        upddates.upsertedCount += document.upsertedCount;
    }
    res.json(upddates);
})

router.post('/news', async (req, res) => {
    let upddates = {
        modifiedCount: 0,
        matchedCount: 0,
        upsertedCount: 0
    };
    const response = await fetch(CLIENT_BASE_API_URL + '/news?skip=0&limit=100', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-Group-Authorization': CLIENT_API_KEY
        },
    })
    const result = await response.json();
    for (const data of result) {
        let filter = { id: data.id };
        let document = await client.db(DB_NAME).collection("new").updateOne(filter, {
            $set: data
        })
        upddates.modifiedCount += document.modifiedCount;
        upddates.matchedCount += document.matchedCount;
        upddates.upsertedCount += document.upsertedCount;
    }
    res.json(upddates);
})

router.post('/events', async (req, res) => {
    let upddates = {
        modifiedCount: 0,
        matchedCount: 0,
        upsertedCount: 0
    };
    const response = await fetch(CLIENT_BASE_API_URL + '/events?skip=0&limit=100', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-Group-Authorization': CLIENT_API_KEY
        },
    })
    const result = await response.json();
    for (const data of result) {
        let filter = { id: data.id };
        let document = await client.db(DB_NAME).collection("event").updateOne(filter, {
            $set: data
        })
        upddates.modifiedCount += document.modifiedCount;
        upddates.matchedCount += document.matchedCount;
        upddates.upsertedCount += document.upsertedCount;
    }
    res.json(upddates);
})

router.post('/users', async (req, res) => {
    let upddates = {
        modifiedCount: 0,
        matchedCount: 0,
        upsertedCount: 0
    };
    const response = await fetch(CLIENT_BASE_API_URL + '/users', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-Group-Authorization': CLIENT_API_KEY
        },
    })
    const result = await response.json();
    for (const data of result) {
        let filter = { id: data.id };
        let document = await client.db(DB_NAME).collection("user").updateOne(filter, {
            $set: data
        })
        upddates.modifiedCount += document.modifiedCount;
        upddates.matchedCount += document.matchedCount;
        upddates.upsertedCount += document.upsertedCount;
    }
    res.json(upddates);
})

module.exports = router;