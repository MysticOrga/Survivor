const { PORT } = require("./Config/env");
const express = require("express");
const cors = require("cors");
const app = express();
const StartupRoute = require("./Controllers/StartupController");

app.use(cors());
app.use("/startup", StartupRoute);

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
})
