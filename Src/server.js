const { PORT } = require("./Config/env");
const MongoCli = require("./Config/db")
const express = require("express");
const app = express();
const router = express.Router();
const { startupRoute } = require("./Routes/StartupRoute");
const { getAllStartups } = require("./Services/startupServices");

router.get("/startup", async (req, res) => {
    const startup = await getAllStartups();
    console.log(startup);
    res.send(startup)
});

app.use("/", router);

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
})
