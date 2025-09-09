const { PORT } = require("./Config/env");
const clientDB = require("./Config/db")
const express = require("express");
const cors = require("cors");
const app = express();
const auth = require("./Middlewares/auth");
const StartupRoute = require("./Controllers/StartupController");
const NewsRoute = require("./Controllers/NewsController");
const EventRoute = require("./Controllers/EventsController");
const UserRoute = require("./Controllers/UserController");
const DevAPI = require("./Services/DevService");
const AdmEventRoute = require("./Controllers/Admin/AdmEventsController");
const AdmNewRoute = require("./Controllers/Admin/AdmNewsController");
const AdmUserRoute = require("./Controllers/Admin/AdmUsersController");
const AdmInvestisorRoute = require("./Controllers/Admin/AdmUsersController");
const AdmStartupRoute = require("./Controllers/Admin/AdmStartupController");
const ProjectRouter = require("./Controllers/ProjectController");
const FilterRouter = require("./Controllers/FilterController");
app.use(express.json());
app.use(cors());
app.use("/startups", StartupRoute);
app.use("/news", NewsRoute);
app.use("/events", EventRoute);
app.use("/users", UserRoute);
app.use("/api/dev", DevAPI);
app.use("/projects", ProjectRouter);
app.use("/admin/events", AdmEventRoute);
app.use("/admin/new", AdmNewRoute);
app.use("/admin/user", AdmUserRoute);
app.use("/admin/startups", AdmStartupRoute);
app.use("/filters", FilterRouter)

app.listen(PORT, () => {
    clientDB.connect();
    console.log("server listening on port " + process.env.PORT);
})

module.exports = app;
