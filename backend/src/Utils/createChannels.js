const { ObjectId } = require("mongodb");

const channels = {
    startup_name: "LearnScape",
    startup_id: new ObjectId('68b6d4ba635638757b86de04'),
    investor_name: "lucas",
    investor_id: new ObjectId('68becbf02057ae1478aad38b'),
    chats: [
        {
            sender_name: "lucas",
            sender_id: new ObjectId('68becbf02057ae1478aad38b'),
            message: "Your project is not really interesting",
            send_at: new Date()
        }
    ]
}
async function run() {
    try {
        await fetch("http://localhost:5001/channels", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(channels)
        });
    } catch {
        console.log('zizi')
    }
}

run();