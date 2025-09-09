<template>
  <section v-if="project && startup" class="project-details">
    <h2>Name: {{ project.name }}</h2>
    <p><strong>Description:</strong> {{ project.description }}</p>
    <p><strong>Status:</strong> {{ project.project_status }}</p>
    <p><strong>Needs (€):</strong> {{ project.needs.toLocaleString() }}</p>
    <p><strong>Sector:</strong> {{ project.sector }}</p>
    <p><strong>Startup:</strong> {{ startup.name }}</p>
    <p><strong>Created at:</strong> {{ new Date(project.created_at).toLocaleString() }}</p>
    <p><strong>Private views:</strong> {{ project.private_views }}</p>
    <p><strong>Public views:</strong> {{ project.public_view }}</p>

    <router-link
      :to="`/home/startup/${project.startup_id}`"
      class="startup-btn"
    >
      Startup Details
    </router-link>
  </section>

  <section v-else class="not-found">
    <p>Project not found.</p>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "ProjectDetails",
  data() {
    return {
      project: null,
      startup: null,
    };
  },
  async created() {
    try {
      const response = await axios.get(`/projects/${this.$route.params.id}`);
      this.project = response.data[0];
      console.log("Project loaded:", this.project);

      if (this.project && this.project.startup_id) {
        const startupRes = await axios.get(`/startups/${this.project.startup_id}`);
        this.startup = startupRes.data;
        console.log("Startup loaded:", this.startup);
      }
    } catch (e) {
      this.project = null;
      this.startup = null;
    }
  },
};
</script>

<style scoped>
.project-details {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  margin: 2rem auto;
  max-width: 600px;
  color: #444;
  text-align: left;
}

.project-details h2 {
  color: var(--purple5);
  margin-bottom: 1.5rem;
}

.project-details p {
  font-size: 16px;
  margin-bottom: 10px;
}

.project-details strong {
  color: var(--pink1);
}

/* Bouton Startup Details */
.startup-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 0.9rem 1.8rem;
  background: var(--purple3);
  color: #fff;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(197, 144, 241, 0.15);
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.startup-btn:hover {
  background: var(--pink1);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(241, 133, 133, 0.25);
}

.startup-btn:active {
  transform: translateY(0);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.not-found {
  padding: 40px;
  text-align: center;
  color: var(--red);
}
</style>
