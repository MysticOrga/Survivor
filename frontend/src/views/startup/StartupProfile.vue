<template>
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
    <div>
    <div class="stats-container">
        <div class="stats-card">
        <div class="title">Welcome</div>
        <div class="value">{{ this.name }}</div>
        <div class="title">"{{ this.description }}"</div>
        </div>
    </div>
    <div class="stats-container">
        <div class="stats-card">
        <div class="title">At this time, your startup is a {{ this.maturity }}</div>
        <div class="title">Your startup legal status is {{ this.legal_status }}</div>
        <div class="title">Check your project views in your Dashboard:</div>
        </div>
    </div>
        <div class="button-container">
            <router-link class="btn" :to="{ name: 'startup-dashboard' }">HERE</router-link>
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
            name: "",
            legal_status: "",
            maturity: "",
            description: ""
        };
    },
    mounted() {
        const token = localStorage.getItem("token");
        if (token) {
            this.decoded = jwtDecode(token);
            this.fetchData();
        }
    },
    methods: {
        async fetchData() {
            try {
              const response = await axios.get(`/startups/${this.decoded.startupID}/`);
              this.name = response.data.name;
              this.description = response.data.description;
              this.legal_status = response.data.legal_status;
              this.maturity = response.data.maturity;
            } catch (err) {
              console.log("Error fetch data Startup", err);
            }
        }
    },
  };

</script>

<style scoped>
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

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: var(--purple5);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.button-container {
  display: flex;
  justify-content: center; /* centers horizontally */
  margin-top: 1rem;        /* optional spacing */
}


.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.stats-card {
  background: linear-gradient(135deg, var(--purple2), var(--pink2));
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: #fff;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}


.stats-card .title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #fff;
}

.stats-card .value {
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
}

@media (max-width: 600px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
}
</style>