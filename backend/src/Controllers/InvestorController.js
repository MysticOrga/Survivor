const Channel = require("../Models/ChannelModels");
const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const auth = require("../Middlewares/auth");

router.get('/:id/channels', auth("investor"), async (req, res) => {
        const filter = { investor_id: new ObjectId(req.params.id) };
        console.log(filter);
        const channels = await Channel.getChannels(filter, 'startup_name', 'startup_id');
        res.json(channels);
})

module.exports = router;