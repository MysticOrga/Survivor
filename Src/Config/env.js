require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CLIENT_API_KEY: process.env.CLIENT_API_KEY
};