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
                const res = await axios.get(`/startups/${this.decoded.startupID}/channels`, {
                  headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                  }
                });
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
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Segoe UI", Roboto, sans-serif;
}

nav {
  background: var(--purple5);
  padding: 0.8rem 1.5rem;
}

nav ul {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

nav a:hover {
  color: var(--pink4);
}

.chat-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
  background: linear-gradient(135deg, var(--purple1), var(--pink3));
}

.channels {
  width: 220px;
  border-right: 2px solid var(--purple3);
  padding: 1rem;
  background: var(--purple2);
  display: flex;
  flex-direction: column;
}

.channels h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--purple5);
}

.channels ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.channels li {
  padding: 0.6rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  background: var(--purple1);
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.channels li:hover {
  background: var(--purple3);
  transform: translateX(4px);
}

.channels li.active {
  background: var(--purple5);
  color: white;
  font-weight: bold;
}

.chatBox {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.messages .my-message {
  background: var(--pink2);
  color: #333;
  align-self: flex-end;
  border-radius: 18px 18px 0 18px;
  padding: 0.6rem 1rem;
  max-width: 70%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.messages .other-message {
  background: var(--purple3);
  color: #222;
  align-self: flex-start;
  border-radius: 18px 18px 18px 0;
  padding: 0.6rem 1rem;
  max-width: 70%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.sender {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
  opacity: 0.8;
}

.time {
  font-size: 0.7rem;
  text-align: right;
  margin-top: 0.3rem;
  opacity: 0.6;
}

.input-box {
  display: flex;
  gap: 0.6rem;
  padding-top: 0.8rem;
  border-top: 2px solid var(--purple2);
}

input[type="text"] {
  flex: 1;
  padding: 0.7rem 1rem;
  border-radius: 20px;
  border: 1px solid var(--purple3);
  outline: none;
  font-size: 1rem;
  transition: border 0.3s;
}

input[type="text"]:focus {
  border: 1px solid var(--purple5);
}

button {
  padding: 0.6rem 1.2rem;
  border: none;
  background: var(--pink1);
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;
}

button:hover {
  background: var(--pink2);
  transform: scale(1.05);
}
</style>
