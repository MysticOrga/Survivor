const { ObjectId } = require("mongodb");
const Project = require("../Models/ProjectModels");
const expres = require("express");
const router = expres.Router();
const auth = require("../Middlewares/auth");

router.get("/", async (req, res) => {
    const data = await Project.getProjects();
    res.json(data);
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const data = await Project.getProject(id);
    res.json(data);
})

router.post("/", auth("admin"), async (req, res) => {
    Project.createProject(req.body);
    res.json({
        msg: "project succesfully created",
        project: req.body
    });
})

router.put("/:id", auth("admin"), async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const data = req.body;
    Project.updateProject(filter, data);
    res.json({
        msg: "project succesfully modified",
    })
})

router.delete("/:id", auth("admin"), async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id)};
    Project.deleteProject(filter);
    res.json({ msg: "project succesfully deleted"});
})

module.exports = router;