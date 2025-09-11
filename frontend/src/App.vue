<template>
  <div class="wrapper">
    <header class="header">
      <div class="headBar">
        <div class="title">
          <img src="@/assets/pictures/logo.png" alt="Logo" class="logo" />
          <h1>JEB Incubator</h1>
        </div>
        <nav class="nav" :class="{ open: isMenuOpen }">
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/home/catalog">Catalog</router-link></li>
            <li><router-link to="/home/news">News</router-link></li>
            <li><router-link to="/home/events">Events</router-link></li>
            <li><router-link to="/home/about">About</router-link></li>
            <li v-if="userRole === 'investor'">
              <router-link to="/investor/messaging">Message</router-link>
            </li>
            <li v-if="userRole === 'founder'">
              <router-link to="/startup/profile">My Profile</router-link>
            </li>
          </ul>
        </nav>
        <div class="tools">
          <ul>
            <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
            <li v-else>
              <span>Welcome {{ userName }} : {{ userRole }}</span>
              <button class="logout-btn" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
        <button class="burger" @click="isMenuOpen = !isMenuOpen">☰</button>
      </div>
    </header>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "vue-router";

const isMenuOpen = ref(false);
const isLoggedIn = ref(false);
const userName = ref("");
const userRole = ref("");
const router = useRouter();

function checkAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName.value = decoded.name || decoded.username || "";
      userRole.value = decoded.role || "";
      isLoggedIn.value = true;
    } catch (e) {
      isLoggedIn.value = false;
      userName.value = "";
      userRole.value = "";
    }
  } else {
    isLoggedIn.value = false;
    userName.value = "";
    userRole.value = "";
  }
}

function logout() {
  axios.defaults.headers.common['Authorization'] = "";
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  isLoggedIn.value = false;
  userName.value = "";
  userRole.value = "";
  router.push("/login");
}

onMounted(() => {
  checkAuth();
  window.addEventListener("storage", checkAuth);
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.wrapper {
  font-family: "Montserrat", sans-serif;
  color: #333;
  background: #fff;
}

.header {
  background: linear-gradient(90deg, var(--pink2), var(--purple3));
  padding: 10px 25px;
  color: #fff;
  margin-bottom: 20px;
}

.headBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title h1 {
  font-family: "Poppins", sans-serif;
  font-size: 24px;
}

.logo {
  height: 40px;
  width: auto;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding-bottom: 4px;
}

.nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  background: #fff;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}

.nav a:hover::after {
  transform: scaleX(1);
}

.nav a.router-link-active::after,
.nav a.router-link-exact-active::after {
  transform: scaleX(1);
}

.tools ul {
  list-style: none;
  display: flex;
  gap: 12px;
}

.tools a {
  background: #fff;
  color: var(--purple5);
  padding: 6px 12px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease, color 0.3s ease;
}

.tools a:hover {
  background: var(--pink4);
}

.burger {
  display: none;
  background: none;
  border: none;
  font-size: 22px;
  color: #fff;
  cursor: pointer;
}

.logout-btn {
  margin-left: 12px;
  background: #fff;
  color: #d500f9;
  border: 1px solid #d500f9;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}

.logout-btn:hover {
  background: #d500f9;
  color: #fff;
}

@media (max-width: 900px) {
  .nav {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--purple2);
    display: none;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }

  .nav.open {
    display: flex;
  }

  .nav ul {
    flex-direction: column;
    gap: 15px;
  }

  .tools {
    display: none;
  }

  .burger {
    display: block;
  }
}
</style>
