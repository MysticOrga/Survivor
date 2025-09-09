const { ObjectId } = require("mongodb");
const Project = require("../Models/ProjectModels");
const expres = require("express");
const router = expres.Router();
const auth = require("../Middlewares/auth");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../Config/env");

router.get("/", async (req, res) => {
    const data = await Project.getProjects();
    res.json(data);
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const token  = req.headers['authorization'].split(" ")[1];
    let public = true;

    console.log(token);
    if (token != 'null') {
        const decode = jwt.verify(token, SECRET);
        if (decode.role == "investor")
            public = false;
    }
    const data = await Project.getProject(id, public);
    res.json(data);
})

router.post("/", auth("investor"), async (req, res) => {
    Project.createProject(req.body);
    res.json({
        msg: "project succesfully created",
        project: req.body
    });
})

router.put("/:id", auth("investor"), async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const data = req.body;
    Project.updateProject(filter, data);
    res.json({
        msg: "project succesfully modified",
    })
})

router.delete("/:id", auth("investor"), async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id)};
    Project.deleteProject(filter);
    res.json({ msg: "project succesfully deleted"});
})

module.exports = router;