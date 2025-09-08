const MongoAPI = require("../Services/MongoService")
const { ObjectId } = require("mongodb");
const crypt = require('bcrypt');
const { SALTROUND, SECRET} = require("../Config/env");
const jwt = require("jsonwebtoken");

exports.loginUser = async (email, pwd) => {
    const filter = { email: email};
    const user = await MongoAPI.readDocuments('user', filter);

    if (user.length) {
        const res = await crypt.compare(pwd.toString(),user[0].password);
        if (res) {
            return await jwt.sign({ id: user[0]._id, role: user[0].role }, SECRET);
        } else {
            return null;
        }
    }
}

exports.registerUser = async (user) => {
    user.password = await crypt.hash(user.password.toString(), SALTROUND);
    MongoAPI.createDocument("user", user);
}

exports.getAllUser = async (data) => {
    return await MongoAPI.readDocuments("user", {});
}

exports.getUserId = async (id) => {
    return await MongoAPI.readDocuments("user", {_id: new ObjectId(id) });
}

