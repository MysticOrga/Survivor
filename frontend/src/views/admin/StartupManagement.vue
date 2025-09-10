<script>
import axios from 'axios';
import router from '@/router';
export default {
  name: 'ProjectPage',
  data() {
    return {
      project : this.$route.state?.project || null
    }
  },
  async created() {
    try {
        const response = await axios.get("projects/" + this.$route.params.id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
      console.log(`/projects/`, this.$route.params.id);
      this.project = response.data[0];
      console.log('project loaded:', this.project);
    } catch (e) {
      console.error('Error project', e);
    }
  },
  methods: {
  async editproject() {
    try {
      await axios.put(`projects/` + this.project._id,
        {
          name: this.project.name,
          project_status: this.project.project_status,
          role: this.project.needs,
          sector: this.project.sector
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      alert("project Edited");
    } catch (err) {
      console.log("Error: ", err);
      alert("Something went wrong.");
    }
  },
  async deleteproject() {
    try {
      await axios.delete(`projects/` + this.project._id,
      {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
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

    <section v-if="project" class="project-page">
      <div class="info">
        <h2>{{ project.name }}</h2>
        <input v-model="project.name" />
        <label for="description"><strong>Description:</strong></label>
          <textarea name="description" rows="4" cols="30" v-model="project.description"></textarea>
        <p><strong>Status:</strong></p>
        <input v-model="project.project_status" type="text" />
        <p><strong>Needs:</strong></p>
        <input v-model="project.needs" type="number" />
        <p><strong>Sector:</strong></p>
        <input v-model="project.sector" type="text" />
      </div>
      <button @click="editproject">Save changes</button>

      <button @click="deleteproject" >Delete this project</button>

    </section>

    <section v-else class="not-found">
      <p>project not found.</p>
    </section>
  </template>
