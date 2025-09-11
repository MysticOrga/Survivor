const jwt = require("jsonwebtoken");
const { SECRET } = require("../Config/env");

function auth(...requiredRoles) {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        console.log("token:", token);
        if (!token) {
            return res.status(401).json({ error: "Token required" });
        }
        try {
            const decoded = jwt.verify(token, SECRET);
            req.user = decoded;
            if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
                return res.status(403).json({
                    error: `Forbidden: requires one of [${requiredRoles.join(", ")}]`
                });
            }
            next();
        } catch (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
    };
}

module.exports = auth;
