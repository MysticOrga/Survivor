<script>
import axios from 'axios';
import router from '@/router';
export default {
  name: 'UserPage',
  data() {
    return {
      user : this.$route.state?.user || null
    }
  },
  async created() {
    try {
        const response = await axios.get("/admin/user/" + this.$route.params.id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
      console.log(`/users/`, this.$route.params.id);
      this.user = response.data;
      console.log('user loaded:', this.user);
    } catch (e) {
      console.error('Error user', e);
    }
  },
  methods: {
  async edituser() {
    try {
      await axios.put(`/admin/user/` + this.user._id,
        {
          name: this.user.name,
          email: this.user.email,
          role: this.user.role
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      alert("user Edited");
    } catch (err) {
      console.log("Error: ", err);
      alert("Something went wrong.");
    }
  },
  async deleteuser() {
    try {
      await axios.delete(`/admin/user/` + this.user._id,
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
    <section v-if="user" class="project-page">
      <div class="info">
        <h2>{{ user.name }}</h2>
        <input v-model="user.name" type="text" /></input>
        <p><strong>Email:</strong></p>
        <input v-model="user.email" type="text" /></input>
        <p><strong>Role:</strong></p>
        <input v-model="user.role" type="text" /></input>
      </div>
      <button @click="edituser">Save changes</button>

      <button @click="deleteuser" >Delete this user</button>

    </section>

    <section v-else class="not-found">
      <p>user not found.</p>
    </section>
  </template>

