const { PORT } = require("./Config/env");
const express = require("express");
const app = express();
const StartupRoute = require("./Controllers/StartupController");
const NewsRoute = require("./Controllers/NewsController");

app.use("/startup", StartupRoute);
app.use("/news", NewsRoute);


app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
})
