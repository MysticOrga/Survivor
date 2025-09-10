<script>
import axios from 'axios';
import router from '@/router';
export default {
  name: 'ProjectPage',
  data() {
    return {
      startup : this.$route.state?.startup || null
    }
  },
  async created() {
    try {
      const response = await axios.get("/startups/" + this.$route.params.id);
      console.log(`/startups/`, this.$route.params.id);
      this.startup = response.data;
      console.log('Startup loaded:', this.startup);
    } catch (e) {
      console.error('Error startup', e);
    }
  },
  methods: {
    downloadJSON() {
    const json = JSON.stringify(this.startup);
    const blob = new Blob([json], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = url;
    link.download = `startup-${this.startup.id || "data"}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },
  async editStartup() {
    try {
      await axios.put(`/admin/startups/` + this.startup._id,
        {
          name: this.startup.name,
          legal_status: this.startup.legal_status,
          address: this.startup.address,
          email: this.startup.email,
          phone: this.startup.phone,
          sector: this.startup.sector,
          maturity: this.startup.maturity,
          views: this.startup.views,
          description: this.startup.description
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      alert("Startup Edited");
    } catch (err) {
      console.log("Error: ", err);
      alert("Something went wrong.");
    }
  },
  async deleteStartup() {
    try {
      await axios.delete(`/admin/startups/` + this.startup._id,
        // {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      router.push("/admin/dashboard/")
    } catch (err) {
      console.log("Error: ", err);
      alert("Something went wrong.");
    }
  }
  },
}
</script>
<template>
    <button @click="downloadJSON">Download Startup JSON</button>

    <section v-if="startup" class="project-page">
      <div class="info">
        <h2>{{ startup.name }}</h2>
        <label for="description"><strong>Description:</strong></label>
          <textarea name="description" rows="4" cols="30">
            Lorem Ipsum bbla blab bla
          </textarea>
        <p><strong>Email:</strong></p>
        <input v-model="startup.email" type="text" /></input>
        <p><strong>Phone:</strong></p>
        <input v-model="startup.phone" type="text" /></input>
        <p><strong>Address:</strong></p>
        <input v-model="startup.address" type="text" /></input>
        <p><strong>Legal status:</strong></p>
        <input v-model="startup.legal_status" type="text" /></input>
        <p><strong>Sector:</strong></p>
        <input v-model="startup.sector" type="text" /></input>
        <p><strong>Maturity:</strong></p>
        <input v-model="startup.maturity" type="text" /></input>
      </div>
      <button @click="editStartup">Save changes</button>

      <button @click="deleteStartup" >Delete this Startup</button>

    </section>

    <section v-else class="not-found">
      <p>Startup not found.</p>
    </section>
  </template>
