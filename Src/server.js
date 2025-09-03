const { PORT } = require("./Config/env");
const MongoCli = require("./Config/db")
const express = require("express");

app.get("/hello", (req, res) => {
    res.send("hello boyao");
})

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
})
