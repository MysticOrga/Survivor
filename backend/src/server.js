const { PORT } = require("./Config/env");
const clientDB = require("./Config/db")
const express = require("express");
const cors = require("cors");
const app = express();
const StartupRoute = require("./Controllers/StartupController");
const NewsRoute = require("./Controllers/NewsController");
const EventRoute = require("./Controllers/EventsController");
const UserRoute = require("./Controllers/UserController");

app.use(express.json());
app.use(cors());
app.use("/startups", StartupRoute);
app.use("/news", NewsRoute);
app.use("/events", EventRoute);
app.use("/users", UserRoute);


app.listen(PORT, () => {
    clientDB.connect();
})
