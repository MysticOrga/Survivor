<template>
  <div class="messaging">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3>Conversations</h3>
        <input
          v-model="q"
          type="text"
          placeholder="Rechercher…"
          class="search"
          aria-label="Rechercher une conversation"
        />
      </div>

      <ul class="channel-list">
        <li
          v-for="ch in filteredChannels"
          :key="ch._id"
          :class="['channel-item', { active: ch._id === activeId }]"
          @click="selectChannel(ch)"
        >
          <div class="avatar" :aria-label="'Investisseur ' + ch.investor_id">
            {{ initials('INV ' + ch.investor_id) }}
          </div>
          <div class="meta">
            <div class="top-row">
              <span class="name">Investisseur {{ ch.investor_id }}</span>
              <time class="time">{{ lastTime(ch) }}</time>
            </div>
            <div class="preview">{{ lastPreview(ch) }}</div>
          </div>
        </li>
      </ul>
    </aside>

    <!-- Zone de chat -->
    <section class="chat" v-if="activeChannel">
      <header class="chat-header">
        <button class="back-btn" @click="activeId = null" aria-label="Retour à la liste">
          ←
        </button>
        <div class="title">
          <h3>Investisseur {{ activeChannel.investor_id }}</h3>
          <p class="subtitle">Channel #{{ activeChannel._id }} · Startup {{ startupId }}</p>
        </div>
      </header>

      <div class="messages" ref="messagesBox">
        <div
          v-for="(m, i) in activeChannel.messages"
          :key="i"
          :class="['bubble', m.from_startup ? 'me' : 'them']"
        >
          <p class="text">{{ m.msg }}</p>
          <time class="stamp">{{ formatDate(m.send_at) }}</time>
        </div>

        <div v-if="activeChannel.messages.length === 0" class="empty-chat">
          Aucune discussion pour l'instant. Dites bonjour 👋
        </div>
      </div>

      <footer class="composer" @keydown.enter.exact.prevent="send">
        <input
          v-model="draft"
          type="text"
          placeholder="Écrire un message…"
          aria-label="Saisir un message"
        />
        <button class="send-btn" :disabled="!draft.trim()" @click="send">Envoyer</button>
      </footer>
    </section>

    <section v-else class="empty">
      <p>Sélectionnez une conversation à gauche pour afficher le chat.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import data from '@/example/chat.json'

const startupId = 101
const channels = ref(data.channels)

const q = ref('')
const activeId = ref(null)
const draft = ref('')
const messagesBox = ref(null)

const filteredChannels = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return channels.value
  return channels.value.filter((c) =>
    String(c.investor_id).includes(term) ||
    lastPreview(c).toLowerCase().includes(term)
  )
})

const activeChannel = computed(() => channels.value.find((c) => c._id === activeId.value) || null)

function selectChannel(ch) {
  activeId.value = ch._id
  nextTick(scrollToBottom)
}

function send() {
  const text = draft.value.trim()
  if (!text || !activeChannel.value) return
  activeChannel.value.messages.push({
    from_startup: true,
    msg: text,
    send_at: new Date().toISOString()
  })
  draft.value = ''
  nextTick(scrollToBottom)
}

function scrollToBottom() {
  const el = messagesBox.value
  if (el) el.scrollTop = el.scrollHeight
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function lastPreview(ch) {
  const last = ch.messages[ch.messages.length - 1]
  return last ? last.msg : 'Aucun message'
}

function lastTime(ch) {
  const last = ch.messages[ch.messages.length - 1]
  return last ? new Date(last.send_at).toLocaleTimeString() : ''
}

function initials(name) {
  return name
    .split(/\s+/)
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join('')
}

onMounted(() => {
  if (channels.value.length) selectChannel(channels.value[0])
})
</script>

<style scoped>
.messaging {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 0;
  height: 80vh;
  max-height: 80vh;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
}

.sidebar {
  border-right: 1px solid #f0f1f3;
  background: #fafbfc;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #f0f1f3;
}
.sidebar-header h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.search {
  width: 90%;
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
}

.channel-list {
  list-style: none;
  margin: 0;
  padding: 8px;
  overflow-y: auto;
  flex: 1;
}
.channel-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
}
.channel-item:hover {
  background: #eef3ff;
}
.channel-item.active {
  background: #e0e8ff;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #dbeafe;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 12px;
}
.meta {
  min-width: 0;
}
.top-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
}
.preview {
  font-size: 13px;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-width: 0;
}
.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f1f3;
}
.back-btn {
  display: none;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}
.title h3 {
  margin: 0;
}
.subtitle {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
}

.messages {
  padding: 16px;
  overflow-y: auto;
  background: #fff;
}
.bubble {
  max-width: 70%;
  padding: 10px 12px;
  border-radius: 14px;
  margin: 8px 0;
  position: relative;
  word-wrap: break-word;
}
.bubble.me {
  margin-left: auto;
  background: #e0f2fe;
  border-top-right-radius: 4px;
}
.bubble.them {
  margin-right: auto;
  background: #f3f4f6;
  border-top-left-radius: 4px;
}
.text {
  margin: 0 0 6px 0;
}
.stamp {
  font-size: 11px;
  color: #6b7280;
}
.empty-chat {
  text-align: center;
  color: #6b7280;
  margin-top: 24px;
}

.composer {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #f0f1f3;
  background: #fff;
}
.composer input {
  flex: 1;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
}
.send-btn {
  padding: 0 16px;
  border: none;
  border-radius: 12px;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
}
.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .messaging {
    grid-template-columns: 1fr;
    height: 90vh;
  }
  .sidebar {
    height: 40vh;
    border-right: none;
    border-bottom: 1px solid #f0f1f3;
  }
  .chat {
    height: 50vh;
  }
  .back-btn {
    display: inline-block;
  }
}
</style>