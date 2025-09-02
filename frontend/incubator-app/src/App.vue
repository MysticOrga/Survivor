<template>
  <div>
    <h1>Welcome to Incubator App</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/home/catalog">Catalog</router-link> |
      <router-link to="/home/news">News</router-link> |
      <router-link to="/home/events">Events</router-link>

      | <router-link to="/admin/dashboard">Admin Dashboard</router-link>

      | <router-link to="/startup/profile">Startup Profile</router-link>
    </nav>
    <router-view />
  </div>
</template>
