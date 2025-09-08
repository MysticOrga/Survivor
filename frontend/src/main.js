import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjkzYWY5ZTM4MjgzZmRjODk3MjA5ZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NzMxMjY0NH0.YyK5UYWZqN26Ig-vKNIKmQEGMwxz2gcGg12BHYlF3mA";

createApp(App).use(router).mount('#app')
