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
    <!-- <button @click="downloadJSON">Download Startup JSON</button> -->

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

<style>


.project-page {
  max-width: 600px;
  margin: 2rem auto;              /* center on page */
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  font-family: system-ui, sans-serif;
}

.project-page input,
.project-page textarea {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.project-page input:focus,
.project-page textarea:focus {
  border-color: var(--purple5);          /* purple accent */
  box-shadow: 0 0 0 3px rgba(106, 13, 173, 0.2);
  outline: none;
}

.project-page button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background 0.2s ease;
}

.project-page button:first-of-type {
  background-color: var(--purple5);      /* save button purple */
  color: white;
}

.project-page button:first-of-type:hover {
  background-color: var(--purple3);
}

.project-page button:last-of-type {
  background-color: var(--pink1);      /* delete button red */
  color: white;
}

.project-page button:last-of-type:hover {
  background-color: var(--pink3);
}

.not-found {
  text-align: center;
  margin-top: 3rem;
  font-size: 1.2rem;
  color: #888;
}
</style>