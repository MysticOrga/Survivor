const MongoAPI = require("../Services/MongoService");
const client = require("../Config/db");
const { ObjectId } = require("mongodb");

exports.createChannels = async (channel) => {
    channel.startup_id = new ObjectId(channel.startup_id);
    channel.investor_id = new ObjectId(channel.investor_id);
    if (channel.chats.length) {
        channel.chats[0].sender_id = new ObjectId(channel.chats[0].sender_id);
    }
    const exist = await MongoAPI.readDocuments('channel', {
        startup_id: channel.startup_id,
        investor_id: channel.investor_id
    });
    if (!exist.length)
        return MongoAPI.createDocument('channel', channel);
}
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
