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
          </ul>
        </nav>
        <div class="tools">
          <ul>
            <li><router-link to="/login">Login</router-link></li>
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
import { ref } from "vue";
const isMenuOpen = ref(false);
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

.main {
  padding: 20px;
}
</style>
