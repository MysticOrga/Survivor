<template>
  <div class="stats">
    <!-- <div class="stats-1">
      <p>{{ totalStartup }}</p>
      <span>Total Startup</span>
    </div>
    <div class="stats-2">
      <p>{{ totalProjects }}</p>
      <span>Total Project</span>
    </div> -->
    <div class="stats-3">
      <p>{{ projectViewprv }}</p>
      <span>Project's Views (private)</span>
    </div>
    <div class="stats-4">
      <p>{{ projectViewpblc }}</p>
      <span>Project's Views (public)</span>
    </div>
    <div class="stats-5">
      <p>{{ startupView }}</p>
      <span>Startup's Views</span>
    </div>
    <div class="stats-6">
      <p>{{ totalView }}</p>
      <span>Total View</span>
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
.stats .stats-1 {
  display: grid;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
}

.stats .stats-2 {
  display: grid;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
}

.stats .stats-3 {
  display: grid;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
}

.stats .stats-4 {
  display: grid;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
}

.stats .stats-5 {
  display: grid;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
}

.stats .stats-6 {
  display: grid;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
}

.stats p {
  color: #c174f2;
  text-decoration: solid;
  text-align: center;
  height: 40px;
  font-size: 4rem;
}

.stats span {
  display: block;
  text-align: center;
  color: #d5a8f2;
}
</style>
