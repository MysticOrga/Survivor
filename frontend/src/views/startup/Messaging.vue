<template>
    <div class="chat-container">
        <nav>
            <ul>
                <li>
                    <router-link to="/startup/dashboard">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="/startup/profile">Profile</router-link>
                </li>
                <li>
                    <router-link to="/startup/messaging">Chat</router-link>
                </li>
                <li>
                    <router-link to="/startup/opportunities">Opportunities</router-link>
                </li>
            </ul>
        </nav>

        <div class="chat-wrapper">
            <!-- Liste des channels -->
            <aside class="channels">
                <h3>Channels</h3>
                <ul>
                    <li v-for="channel in channels" :key="channel.channel_id"
                        :class="{ active: currentChannel?.channel_id === channel.channel_id }"
                        @click="selectChannel(channel)">
                        {{ channel.channel_name }}
                    </li>
                </ul>
            </aside>

            <!-- Chat -->
            <section class="chatBox">
                <div class="messages">
                    <div v-for="msg in messages" :key="msg.send_at"
                        :class="{ 'my-message': isMyMessage(msg), 'other-message': !isMyMessage(msg) }">
                        <p class="sender">{{ msg.sender_name }}</p>
                        <p class="content">{{ msg.message }}</p>
                        <p class="time">{{ new Date(msg.send_at).toLocaleTimeString() }}</p>
                    </div>
                </div>

                <div class="input-box">
                    <input type="text" v-model="messageInput" @keyup.enter="sendMessage"
                        placeholder="Type your message..." />
                    <button @click="sendMessage">Send</button>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
    data() {
        return {
            decoded: null,
            channels: [],
            currentChannel: null,
            messages: [],
            messageInput: "",
        };
    },
    mounted() {
        const token = localStorage.getItem("token");
        if (token) {
            this.decoded = jwtDecode(token);
            this.fetchChannels();
        }
    },
    methods: {
        async fetchChannels() {
            try {
                const res = await axios.get(`/startups/${this.decoded.startupID}/channels`);
                this.channels = res.data;
            } catch (err) {
                console.error("Error fetching channels:", err);
            }
        },
        async selectChannel(channel) {
            this.currentChannel = channel;
            await this.fetchMessages(channel.channel_id);
        },
        async fetchMessages(channel_id) {
            try {
                const res = await axios.get(`/channels/${channel_id}/chats`);
                this.messages = res.data;
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        },
        isMyMessage(msg) {
            return msg.sender_name !== this.currentChannel.channel_name;
        },
        async sendMessage() {
            if (!this.messageInput || !this.currentChannel) return;

            const newMessage = {
                sender_name: this.decoded.name,
                sender_id: this.decoded.id,
                message: this.messageInput,
                send_at: new Date().toISOString(),
            };

            console.log("Decoded" + this.decoded);
            console.log("Message: " + newMessage);
            try {
                await axios.put(`/channels/${this.currentChannel.channel_id}/chat`, {chat :newMessage});
                this.messages.push(newMessage);
                this.messageInput = "";
            } catch (err) {
                console.error("Error sending message:", err);
            }
        },
    },
};
</script>

<style scoped>
:root {
    --pink1: #f18585;
    --pink2: #f49c9c;
    --pink3: #f6aeae;
    --pink4: #f8cacf;
    --purple1: #eed5fb;
    --purple2: #e4bef8;
    --purple3: #d5a8f2;
    --purple4: #cb90f1;
    --purple5: #c174f2;
}

.chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

nav {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: var(--purple2);
}

.chat-wrapper {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.channels {
    width: 200px;
    border-right: 1px solid #ccc;
    padding: 1rem;
    background: var(--purple1);
}

.channels ul {
    list-style: none;
    padding: 0;
}

.channels li {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    border-radius: 5px;
}

.channels li.active {
    background: var(--purple4);
    color: white;
}

.chatBox {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: var(--pink1);
}

.messages {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1rem;
}

.messages .my-message {
    background: var(--pink4);
    align-self: flex-end;
    border-radius: 10px;
    margin: 0.3rem 0;
    padding: 0.5rem 1rem;
    max-width: 70%;
}

.messages .other-message {
    background: var(--purple3);
    align-self: flex-start;
    border-radius: 10px;
    margin: 0.3rem 0;
    padding: 0.5rem 1rem;
    max-width: 70%;
}

.sender {
    font-weight: bold;
}

.time {
    font-size: 0.7rem;
    text-align: right;
}

.input-box {
    display: flex;
    gap: 0.5rem;
}

input[type="text"] {
    flex: 1;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
}

button {
    padding: 0.5rem 1rem;
    border: none;
    background: var(--purple5);
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background: var(--purple4);
}
</style>
