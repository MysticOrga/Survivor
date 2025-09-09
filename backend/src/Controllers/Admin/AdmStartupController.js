const express = require("express");
const auth = require("../../Middlewares/auth");
const AdmEvent = require("../../Models/Admin/AdmStartupModels")
const router = express.Router();

router.get("/", auth("admin"), async (req, res) => {
    try {
        const data = await AdmEvent.getAllStartup();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", auth("admin"), async (req, res) => {
    try {
        const data = await AdmEvent.getStartupById(req.params.id);
        if (!data)
            return res.status(404).json({ error: "Event not found" });
        res.json(data);
    } catch {
        res.status(400).json({ error: "Invalid ID" });
    }
});

router.post("/", auth("admin"), async (req, res) => {
    try {
        const newEvent = await AdmEvent.createStartup(req.body);
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", auth("admin"), async (req, res) => {
    try {
        console.log(req.header);
        const updated = await AdmEvent.updateStartup(req.params.id, req.body);
        if (!updated)
            return res.status(404).json({ error: "Event not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", auth("admin"), async (req, res) => {
    try {
        const deleted = await AdmEvent.deleteStartup(req.params.id);
        if (!deleted)
            return res.status(404).json({ error: "Event not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
