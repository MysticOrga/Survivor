const { ObjectId } = require("mongodb");
const Channel = require("../Models/ChannelModels");
const express = require("express");
const router = express.Router();

router.get('/:id/chats', async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id)};
    const chats = await Channel.getChannelChats(filter);
    res.json(chats);
})

router.put('/:id/chat', async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const chat = req.body.chat;
    const data = await Channel.postChat(filter, { ...chat, send_at: new Date() })
    res.json()
})

router.post('/', async (req, res) => {
    console.log(req.body);
    await Channel.createChannels(req.body);
    res.json({ msg: "channel succesfully created" })
})

module.exports = router;