const { PORT } = require("./Config/env");
const clientDB = require("./Config/db")
const express = require("express");
const cors = require("cors");
const app = express();
const StartupRoute = require("./Controllers/StartupController");
const NewsRoute = require("./Controllers/NewsController");
const EventRoute = require("./Controllers/EventsController");

app.use(cors());
app.use("/startup", StartupRoute);
app.use("/news", NewsRoute);
app.use("/events", EventRoute);


try {
    app.listen(PORT, () => {
        clientDB.connect();
        console.log(`listen on port ${PORT}`);
    })
} finally {
    clientDB.close();
}
