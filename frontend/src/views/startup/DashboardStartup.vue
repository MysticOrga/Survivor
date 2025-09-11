<template>
  <div class="stats-container">
    <div class="stats-card">
      <div class="title">Project's Views (private)</div>
      <div class="value">{{ projectViewprv }}</div>
    </div>
    <div class="stats-card">
      <div class="title">Project's Views (public)</div>
      <div class="value">{{ projectViewpblc }}</div>

    </div>
    <div class="stats-card">
      <div class="title">Startup's Views</div>
      <div class="value">{{ startupView }}</div>

    </div>
    <div class="stats-card">
      <div class="title">Total View</div>
      <div class="value">{{ totalView }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashboardStartup",
  data() {
    return {
      startups: [],
      projects_prv: [],
      totalStartup: 0,
      totalProjects: 0,
      startupView: 0,
      projectViewprv: 0,
      projectViewpblc: 0,
      totalView: 0,
    };
  },
  async created() {
    try {
      const response = await axios({
        url: "/startups",
        method: "get",
      });
      this.startups = response.data.sort(
        (a, b) => (b.views || 0) - (a.views || 0)
      );
      this.totalStartup = this.startups.length;
      this.startupView = this.startups.reduce(
        (sum, s) => sum + (s.views || 0),
        0
      );

      const project_resp = await axios({
        url: "/projects",
        method: "get",
      });
      this.projects_prv = project_resp.data.sort(
        (a, b) => (b.private_views || 0) - (a.private_views || 0)
      );
      this.projects_pbl = project_resp.data.sort(
        (a, b) => (b.public_view || 0) - (a.public_view || 0)
      );

      this.totalProjects = this.projects_prv.length;

      this.projectViewprv = this.projects_prv.reduce(
        (sum, s) => sum + (s.private_views || 0),
        0
      );
      this.projectViewpblc = this.projects_prv.reduce(
        (sum, s) => sum + (s.public_view || 0),
        0
      );

      this.totalView =
        this.projectViewpblc + this.projectViewprv + this.startupView;
    } catch (e) {
      console.error("Error in startup dashboard", e);
    }
  },
};
</script>

<style>
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
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
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
