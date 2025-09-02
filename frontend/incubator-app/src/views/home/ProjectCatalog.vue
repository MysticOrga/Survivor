<template>
  <div class="catalog">
    <div
      v-for="startup in startups"
      :key="startup.id"
    >
      <router-link :to="`/home/project/${startup.id}`">
        <div class="card">
          <h2>{{ startup.name }}</h2>
          <p>{{ startup.Description }}</p>
          <p><strong>Secteur:</strong> {{ startup.sector }}</p>
          <p><strong>Besoin:</strong> {{ startup.needs }} €</p>
          <a :href="startup.Ext_url[0]" target="_blank">Site web</a>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import startups from '@/example/startup.json'

export default {
  name: 'ProjectCatalog',
  data() {
    return {
      startups
    }
  }
}
</script>
<!-- 
<style scoped>
.catalog {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
  background: #fff;
}
</style> -->