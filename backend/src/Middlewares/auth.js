const jwt = require("jsonwebtoken");
const { SECRET } = require("../Config/env");

function auth(requiredRole) {
    return (req, res, next) => {
        console.log("Authorization header:", req.headers["authorization"]);

        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token required" });
        }
        try {
            const decoded = jwt.verify(token, SECRET);
            req.user = decoded;
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ error: "Forbidden: insufficient rights" });
            }
            next();
        } catch (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
    };
}

module.exports = auth;
