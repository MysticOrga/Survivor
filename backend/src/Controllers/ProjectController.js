const { ObjectId } = require("mongodb");
const Project = require("../Models/ProjectModels");
const expres = require("express");
const router = expres.Router();
const auth = require("../Middlewares/auth");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../Config/env");

router.get("/filter", async (req, res) => {

    //to do: Quand filter c'est addresse -> afficher tous les projet des startups de cette addresse
    //Vérifier bien les champs
    try {
        const filters = {};
        for (const [key, value] of Object.entries(req.query)) {
            if (key === "country") {
                filters["address"] = { $regex: value + "$", $options: "i" };
            } else if (key === "sector" || key === "project_status") {
                filters[key] = { $regex: "^" + value + "$", $options: "i" };
            } else {
                filters[key] = value;
            }
        }
        const data = await Project.getStartupProjects(filters);
        if (data.length > 0)
            res.json(data);
        else
            res.status(404).send("No startups found for this filters");
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