const { PORT } = require("./Config/env");
const express = require("express");
const app = express();
const StartupRoute = require("./Controllers/StartupController");
const NewsRoute = require("./Controllers/NewsController");
const EventRoute = require("./Controllers/EventsController");

app.use("/startup", StartupRoute);
app.use("/news", NewsRoute);
app.use("/events", EventRoute);


app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
})
