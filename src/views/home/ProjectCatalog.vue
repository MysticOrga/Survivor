<template>
  <div class="filtersResearch">
    <button @click="sortAlphaAsc">A → Z</button>
    <button @click="sortAlphaDesc">Z → A</button>
    <button @click="downloadJSON">Download Startup JSON</button>
  </div>
  <div class="catalog">
    <div v-for="startup in startups" :key="startup.id" class="card">
      <router-link :to="{ name: 'project', params: { id: startup._id }, state: { startup } }" class="card-link">
        <h2>{{ startup.name }}</h2>
        <p class="description">Description: {{ startup.description }}</p>
        <p><strong>Secteur:</strong> {{ startup.sector }}</p>
        <p><strong>Address:</strong> {{ startup.address }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProjectPage',
  data() {
    return {
      startup : this.$route.state?.startup || null
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/startups/' + this.$route.params.id);
      console.log('http://localhost:8080/startups/', this.$route.params.id);
      this.startup = response.data;
      console.log('Startup loaded:', this.startup);
    } catch (e) {
      console.error('Error startup', e);
    }
  },
  methods: {
    downloadJSON() {
    console.log("test blobl");
    const json = JSON.stringify(this.startup);
    const blob = new Blob([json], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = url;
    link.download = `startup-${this.startup.id || "data"}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
  },
}
</script>

<style scoped>
.catalog {
  display: grid;
  gap: 1.5rem;
  padding: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

@media (min-width: 1200px) {
  .catalog {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  .catalog {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .catalog {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .catalog {
    grid-template-columns: 1fr;
  }
}

.filtersResearch {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 20px 0;
  flex-wrap: wrap;
}

.filtersResearch button {
  background: var(--pink2);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.filtersResearch button:hover {
  background: var(--purple4);
  color: #fff;
  transform: translateY(-3px);
}

.filtersResearch button:active {
  background: var(--purple5);
  transform: translateY(0);
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.35s ease, color 0.35s ease;
  border-top: 5px solid var(--purple3);
  color: #444;
}

.card:hover {
  transform: translateY(-6px);
  background: var(--purple3);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  color: #fff;
}

.card h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--purple5);
  transition: color 0.35s ease;
}

.card p {
  font-size: 14px;
  margin-bottom: 8px;
  transition: color 0.35s ease;
}

.card .description {
  font-size: 15px;
  margin-bottom: 12px;
}

.card:hover h2,
.card:hover p {
  color: #fff;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.ext-link {
  display: inline-block;
  margin-top: 10px;
  padding: 6px 12px;
  background: var(--pink2);
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.25s ease, color 0.25s ease;
}

.card:hover .ext-link {
  background: #fff;
  color: var(--purple5);
}

</style>
