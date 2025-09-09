const Filter = require("../Models/FilterModel");
const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/auth");

router.get('/sector', async (req, res) => {
    const resp = await Filter.getFilter();
    res.json({
        filter_list: resp
    });
})

router.put('/sector', auth("admin"), async (req, res) => {
    const filter = req.body.filter;
    await Filter.addSector(filter);
    res.json({
        msg: "sector added to the filter list",
        filter: filter
    });
})

module.exports = router;