require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CLIENT_API_KEY: process.env.CLIENT_API_KEY,
    DB_NAME: process.env.DB_NAME,
    PASSWORD: process.env.PASSWORD,
    SALTROUND: parseInt(process.env.SALTROUND, 10),
    SECRET: process.env.SECRET,
    DEV_API_KEY: process.env.DEV_API_KEY
};