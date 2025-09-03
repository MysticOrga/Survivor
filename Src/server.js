const { PORT } = require("./Config/env");
const MongoCli = require("./Config/db")
const express = require("express");
const app = express();
const router = express.Router();
const { startupRoute } = require("./Routes/StartupRoute");
const { getAllStartups } = require("./Services/startupServices");
router.get("/test", getAllStartups);

app.use("/", router);

app.get("/hello", (req, res) => {
    res.send("hello boyao");
})

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
})
