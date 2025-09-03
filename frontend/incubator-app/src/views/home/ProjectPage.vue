<template>
  <section v-if="startup" class="project-page">
    <div class="info">
      <h2>{{ startup.name }}</h2>
      <!-- <p><strong>Description:</strong> {{ startup.Description }}</p> -->
      <p><strong>Email:</strong> {{ startup.email }}</p>
      <p><strong>Phone:</strong> {{ startup.phone }}</p>
      <p><strong>Address:</strong> {{ startup.address }}</p>
      <p><strong>Legal status:</strong> {{ startup.legal_status }}</p>
      <!-- <p><strong>Founded:</strong> {{ startup.created_at }}</p> -->
      <p><strong>Sector:</strong> {{ startup.sector }}</p>
      <p><strong>Maturity:</strong> {{ startup.maturity }}</p>
      <!-- <p><strong>Project status:</strong> {{ startup.Project_status }}</p> -->
      <!-- <p><strong>Funding needs:</strong> {{ startup.needs }} €</p> -->

      <!-- <div class="links" v-if="startup.Ext_url && startup.Ext_url.length"> -->
        <!-- <strong>External links:</strong> -->
        <!-- <ul> -->
          <!-- <li v-for="url in startup.Ext_url" :key="url"> -->
            <!-- <a :href="url" target="_blank">{{ url }}</a> -->
          <!-- </li> -->
        <!-- </ul> -->
      <!-- </div> -->
<!--  -->
      <!-- <div class="funders" v-if="startup.funder && startup.funder.length"> -->
        <!-- <strong>Funders:</strong> -->
        <!-- <ul> -->
          <!-- <li v-for="f in startup.funder" :key="f.name"> -->
            <!-- {{ f.name }} ({{ f.role }}) : {{ f.amount }} € -->
          <!-- </li> -->
        <!-- </ul> -->
      <!-- </div> -->
    </div>

    <div class="image">
      <img src="@/assets/pictures/placeholder.jpg" alt="Startup illustration" />
    </div>
  </section>

  <section v-else class="not-found">
    <p>Startup not found.</p>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProjectPage',
  data() {
    return {
      startup : this.$route.state?.startup || null
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/startup/' + this.$route.params.id);
      console.log('http://localhost:8080/startup/', this.$route.params.id);
      this.startup = response.data[0];
      console.log('Startup loaded:', this.startup);
    } catch (e) {
      console.error('Error startup', e);
    }
  }
}
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

.links ul,
.funders ul {
  margin-top: 8px;
  padding-left: 20px;
}

.links a {
  color: var(--purple5);
  text-decoration: none;
  transition: color 0.3s ease;
}

.links a:hover {
  color: var(--pink1);
}

.image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
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

  .image {
    width: 100%;
    margin-top: 20px;
  }
}

.not-found {
  padding: 40px;
  text-align: center;
  color: var(--pink1);
}
</style>
