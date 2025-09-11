const { ObjectId } = require("mongodb");
const Project = require("../Models/ProjectModels");
const expres = require("express");
const router = expres.Router();
const auth = require("../Middlewares/auth");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../Config/env");
const client = require("../Config/db");

router.get("/filter", async (req, res) => {
    try {
        const filters = {};
        if (req.query.address || req.query.country) {
            const db = client.db("ClientDB");
            const startupCol = db.collection("startup");
            const searchValue = req.query.address || req.query.country;
            const startups = await startupCol.find({
                address: { $regex: searchValue, $options: "i" }
            }).toArray();
            if (startups.length === 0) {
                return res.status(404).send("No startups found for this address/country");
            }
            const startupIds = startups.map(s => s._id);
            filters.startup_id = { $in: startupIds };
        }
        if (req.query.sector) {
            filters.sector = { $regex: "^" + req.query.sector + "$", $options: "i" };
        }
        if (req.query.project_status) {
            filters.project_status = {
                $regex: "^" + req.query.project_status + "$",
                $options: "i"
            };
        }
        const projects = await Project.getStartupProjects(filters);
        if (projects.length > 0) {
            res.json(projects);
        } else {
            res.status(404).send("No projects found for this filter");
        }
    } catch (err) {
        res.status(500).send("Server error: " + err.message);
    }
});

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

router.post("/", auth("admin", 'founder'), async (req, res) => {
    Project.createProject(req.body);
    res.json({
        msg: "project succesfully created",
        project: req.body
    });
})

router.put("/:id", auth("admin", 'founder'), async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const data = req.body;
    Project.updateProject(filter, data);
    res.json({
        msg: "project succesfully modified",
    })
})

router.delete("/:id", auth("admin", 'founder'), async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id)};
    Project.deleteProject(filter);
    res.json({ msg: "project succesfully deleted"});
})




module.exports = router;