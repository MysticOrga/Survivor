const { PORT } = require("./src/Config/env");
const clientDB = require("./src/Config/db")
const express = require("express");
const cors = require("cors");
const app = express();
const auth = require("./src/Middlewares/auth");
const StartupRoute = require("./src/Controllers/StartupController");
const NewsRoute = require("./src/Controllers/NewsController");
const EventRoute = require("./src/Controllers/EventsController");
const UserRoute = require("./src/Controllers/UserController");
const DevAPI = require("./src/Services/DevService");

const AdmEventRoute = require("./src/Controllers/Admin/AdmEventsController");
const AdmNewRoute = require("./src/Controllers/Admin/AdmNewsController");
const AdmUserRoute = require("./src/Controllers/Admin/AdmUsersController");
const AdmInvestisorRoute = require("./src/Controllers/Admin/AdmUsersController");

app.use(express.json());
app.use(cors());
app.use("/startups", StartupRoute);
app.use("/news", NewsRoute);
app.use("/events", EventRoute);
app.use("/users", UserRoute);
app.use("/api/dev", DevAPI);

app.use("/admin/events", AdmEventRoute);
app.use("/admin/new", AdmNewRoute);
app.use("/admin/user", AdmUserRoute);
app.use("/admin/investisor", AdmInvestisorRoute);


app.listen(PORT, () => {
    clientDB.connect();
    console.log("server listening on port " + process.env.PORT);
})

module.exports = app;
