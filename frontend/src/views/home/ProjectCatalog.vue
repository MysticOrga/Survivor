<template>
  <div class="filtersResearch">
    <select v-model="selectedFilter" class="filter-select">
      <option value="" disabled selected>Filter By</option>
      <option value="sector">Sector</option>
      <option value="country">Location</option>
      <option value="project_status">Maturity</option>
    </select>

    <select v-if="selectedFilter" v-model="selectedValue" class="filter-dropdown">
      <option v-if="selectedFilter === 'sector'" value="DeepTech">DeepTech</option>
      <option v-if="selectedFilter === 'sector'" value="EdTech">EdTech</option>
      <option v-if="selectedFilter === 'sector'" value="FinTech">FinTech</option>
      <option v-if="selectedFilter === 'sector'" value="HealthTech">HealthTech</option>
      <option v-if="selectedFilter === 'sector'" value="Logistics">Logistics</option>
      <option v-if="selectedFilter === 'sector'" value="SaaS">SaaS</option>
      <option v-if="selectedFilter === 'sector'" value="Sustainability">Sustainability</option>

      <option v-if="selectedFilter === 'country'" value="Austria">Austria</option>
      <option v-if="selectedFilter === 'country'" value="Belgium">Belgium</option>
      <option v-if="selectedFilter === 'country'" value="Finland">Finland</option>
      <option v-if="selectedFilter === 'country'" value="France">France</option>
      <option v-if="selectedFilter === 'country'" value="Germany">Germany</option>
      <option v-if="selectedFilter === 'country'" value="Ireland">Ireland</option>
      <option v-if="selectedFilter === 'country'" value="Italy">Italy</option>
      <option v-if="selectedFilter === 'country'" value="Netherlands">Netherlands</option>
      <option v-if="selectedFilter === 'country'" value="Portugal">Portugal</option>
      <option v-if="selectedFilter === 'country'" value="Spain">Spain</option>
      <option v-if="selectedFilter === 'country'" value="Sweden">Sweden</option>

      <option v-if="selectedFilter === 'project_status'" value="Idea">Idea</option>
      <option v-if="selectedFilter === 'project_status'" value="MVP">MVP</option>
      <option v-if="selectedFilter === 'project_status'" value="Prototype">Prototype</option>
      <option v-if="selectedFilter === 'project_status'" value="Product-Market Fit">Product-Market Fit</option>
    </select>

    <button @click="applyFilter">Apply Filter</button>
    <button v-if="selectedFilter || selectedValue" @click="resetFilter"
      style="background:var(--purple3);margin-left:10px;">Reset</button>
  </div>

  <div class="catalog">
    <div v-for="project in projects" :key="project._id" class="card">
      <h2>{{ project.name }}</h2>
      <p class="description">{{ project.description }}</p>
      <p><strong>Secteur:</strong> {{ project.sector }}</p>
      <p>
        <strong>Startup:</strong>
        {{ getStartupName(project.startup_id) }}
      </p>

      <router-link :to="`/home/startup/${project.startup_id}`" class="ext-link">
        View Startup
      </router-link>
      <router-link :to="`/home/project/${project._id}`" class="ext-link">
        More Details
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
  name: "ProjectCatalog",
  data() {
    return {
      projects: [],
      startups: [],
      selectedFilter: "",
      selectedValue: "",
      userRole: null,
    };
  },
  async created() {
    this.setUserRole();
    await this.fetchProjects();
    await this.fetchStartups();
  },
  methods: {
    setUserRole() {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        this.userRole = decoded.role;
      }
    },
    async fetchProjects() {
      try {
        const res = await axios.get("/projects");
        this.projects = res.data;
      } catch (e) {
        this.projects = [];
      }
    },
    async fetchStartups() {
      try {
        const res = await axios.get("/startups");
        this.startups = res.data;
      } catch (e) {
        this.startups = [];
      }
    },
    getStartupName(startupId) {
      const startup = this.startups.find((s) => s._id === startupId);
      return startup ? startup.name : "Unknown Startup";
    },
    async applyFilter() {
      if (!this.selectedFilter || !this.selectedValue) return;
      try {
        const res = await axios.get(
          `/projects/filter?${this.selectedFilter}=${encodeURIComponent(this.selectedValue)}`
        );
        this.projects = res.data;
        console.log(this.projects);
      } catch (e) {
        this.projects = [];
      }
    },
    async resetFilter() {
      this.selectedFilter = "";
      this.selectedValue = "";
      await this.fetchProjects();
    },
  },
};
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

.filtersResearch select {
  background: #fff;
  color: #444;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 12px;
  min-width: 150px;
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.filtersResearch select:focus {
  outline: none;
  border-color: var(--purple3);
  box-shadow: 0 0 6px rgba(150, 90, 255, 0.2);
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border-top: 5px solid var(--purple3);
  color: #444;
}

.card h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--purple5);
}

.card p {
  font-size: 14px;
  margin-bottom: 8px;
}

.card .description {
  font-size: 15px;
  margin-bottom: 12px;
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
  transition: background 0.25s ease, transform 0.2s ease;
}

.ext-link:hover {
  background: var(--purple4);
  color: #fff;
  transform: translateY(-2px);
}
</style>
