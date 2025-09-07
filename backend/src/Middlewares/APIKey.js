const { DEV_API_KEY, CLIENT_API_KEY } = require("../Config/env");

function authAPI(keyType) {
    return (req, res, next) => {
        const apikey = req.headers["x-group-authorization"];
        if (apikey) {
            if (keyType == "client" && apikey == CLIENT_API_KEY) next();
            if (keyType == "dev" && apikey == DEV_API_KEY) next();
            // res.status(401).json({ error: "Invalid api key" })
        } else {
            res.status(401).json({ error: "Authorization required" })
        }
    };
}

module.exports = authAPI;