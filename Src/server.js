const { PORT } = require("./Config/env");
const express = require("express");
const app = express();
const StartupRoute = require("./Controllers/StartupController");

app.use("/startup", StartupRoute);

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
})
