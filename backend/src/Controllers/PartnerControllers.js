const Partner = require("../Models/PartnerModels");
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const data = await Partner.getPartners();
    res.json(data);
})

module.exports = router;