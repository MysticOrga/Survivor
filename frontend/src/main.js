import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import axios from 'axios'

const status = import.meta.env.VITE_APP_STATUS
const url = status == 'DEV' ? 'http://localhost:5001/' : import.meta.env.VITE_API_URL
axios.defaults.baseURL = url
createApp(App).use(router).mount('#app')