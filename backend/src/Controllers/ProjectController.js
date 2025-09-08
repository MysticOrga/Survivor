const Project = require("../Models/ProjectModel");
const expres = require("express");
const router = expres.Router();

router.get("/", async (req, res) => {
    const data = await Project.getProjects();
    res.json(data);
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const data = await Project.getProject(id);
    res.json(data);
})

module.exports = router;