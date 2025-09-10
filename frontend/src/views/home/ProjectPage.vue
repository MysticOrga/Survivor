<template>
  <button @click="downloadJSON">Download Startup JSON</button>
  <button v-if="userRole === 'investor'" @click="createChannel">
    Contact Startup
  </button>
  <section v-if="startup" class="project-page">
    <div class="info">
      <h2>{{ startup.name }}</h2>
      <p><strong>Description:</strong> {{ startup.Description }}</p>
      <p><strong>Email:</strong> {{ startup.email }}</p>
      <p><strong>Phone:</strong> {{ startup.phone }}</p>
      <p><strong>Address:</strong> {{ startup.address }}</p>
      <p><strong>Legal status:</strong> {{ startup.legal_status }}</p>
      <p><strong>Sector:</strong> {{ startup.sector }}</p>
      <p><strong>Maturity:</strong> {{ startup.maturity }}</p>
    </div>
  </section>

  <section v-if="projects.length" class="projects-section">
    <h3>Projects of {{ startup.name }}</h3>
    <div class="table-wrapper">
      <table class="projects-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Sector</th>
            <th>Status</th>
            <th>Needs (€)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project._id" class="project-row" @click="goToProject(project._id)">
            <td>{{ project.name }}</td>
            <td>{{ project.description }}</td>
            <td>{{ project.sector }}</td>
            <td>{{ project.project_status }}</td>
            <td>{{ project.needs.toLocaleString() }}</td>
          </tr>
        </tbody>

      </table>
    </div>
  </section>

  <section v-else class="not-found">
    <p>No projects found for this startup.</p>
  </section>
</template>
<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
  name: "StartupPage",
  data() {
    return {
      startup: this.$route.state?.startup || null,
      projects: [],
      userRole: null,
    };
  },
  async created() {
    try {
      this.setUserRole();
      const response = await axios.get(`/startups/${this.$route.params.id}`);
      this.startup = response.data;

      const projectsRes = await axios.get(
        `/startups/${this.$route.params.id}/projects`
      );
      this.projects = projectsRes.data;

      console.log("Startup loaded:", this.startup);
      console.log("Projects loaded:", this.projects);
    } catch (e) {
      console.error("Error loading startup or projects", e);
    }
  },
  methods: {
    downloadJSON() {
      const json = JSON.stringify(this.startup);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = url;
      link.download = `startup-${this.startup._id || "data"}.json`;
      link.click();
      URL.revokeObjectURL(url);
    },
    goToProject(id) {
      this.$router.push(`/home/project/${id}`);
    },
    setUserRole() {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        this.userRole = decoded.role;
      }
    },
    async createChannel() {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      const decoded = jwtDecode(token);
      if (!token) {
        alert("You must be logged in to create a channel.");
        return;
      }
      const newChannel = {
        startup_name: this.startup.name,
        startup_id: this.startup._id,
        investor_name: decoded.name,
        investor_id: decoded.id,
        chats: []
      }
      try {
        await axios.post(`/channels/`, newChannel );
        this.$router.push('/investor/messaging');
      } catch (err) {
        console.error("Error sending message:", err);
      }
    },
  },
};
</script>


<style scoped>
.project-page {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 30px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.info {
  flex: 2;
  color: #444;
}

.info h2 {
  font-size: 26px;
  margin-bottom: 16px;
  color: var(--purple5);
}

.info p {
  font-size: 15px;
  margin-bottom: 8px;
}

.info strong {
  color: var(--pink1);
}

.projects-section {
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.projects-section h3 {
  font-size: 22px;
  margin-bottom: 16px;
  color: var(--purple5);
}

.table-wrapper {
  overflow-x: auto;
}

.projects-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

.projects-table th,
.projects-table td {
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.projects-table th {
  background: var(--purple3);
  color: #fff;
  font-weight: 600;
}

.projects-table tr:hover {
  background: var(--purple1);
}

.not-found {
  padding: 40px;
  text-align: center;
  color: var(--pink1);
}

button {
  background: var(--purple3);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  margin: 1rem 0;
  box-shadow: 0 4px 10px rgba(197, 144, 241, 0.15);
}

button:hover {
  background: var(--pink1);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(241, 133, 133, 0.25);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 900px) {
  .project-page {
    flex-direction: column;
    align-items: center;
  }

  .info {
    flex: unset;
    width: 100%;
  }
}

@media (max-width: 600px) {
  button {
    width: 100%;
    padding: 0.9rem;
    font-size: 1.05rem;
  }

  .projects-table th,
  .projects-table td {
    padding: 10px;
    font-size: 14px;
  }
}

.projects-table tr {
  cursor: pointer;
  transition: background 0.2s ease;
}

.projects-table tr:hover {
  background: var(--purple1);
}
</style>
