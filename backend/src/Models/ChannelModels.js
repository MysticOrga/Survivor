const MongoAPI = require("../Services/MongoService");
const client = require("../Config/db");

exports.postChat = async (filter, chat) => {
    const db = client.db("ClientDB");

    db.collection('channel').updateOne(filter, {
        $push: {
            chats: chat
        }
    });
}

exports.getChannels = async (filter, channel_name, recv_id) => {
    return (await MongoAPI.readDocuments('channel', filter)).map(channel => ({
        channel_name: channel[channel_name],
        receiver_id: channel[recv_id],
        channel_id: channel._id
    }));
}

exports.getChannelChats = async (filter) => {
    const channel = await MongoAPI.readDocuments('channel', filter);
    return channel[0].chats
}
