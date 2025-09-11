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