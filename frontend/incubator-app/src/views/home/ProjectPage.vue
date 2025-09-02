<template>
  <section v-if="startup">
    <div class="info">
      <h2>{{ startup.name }}</h2>
      <p><strong>Description:</strong> {{ startup.Description }}</p>
      <p><strong>Email:</strong> {{ startup.email }}</p>
      <p><strong>Téléphone:</strong> {{ startup.phone }}</p>
      <p><strong>Adresse:</strong> {{ startup.address }}</p>
      <p><strong>Statut légal:</strong> {{ startup.Legal_status }}</p>
      <p><strong>Date de création:</strong> {{ startup.created_at }}</p>
      <p><strong>Secteur:</strong> {{ startup.sector }}</p>
      <p><strong>Maturité:</strong> {{ startup.Maturity }}</p>
      <p><strong>Statut du projet:</strong> {{ startup.Project_status }}</p>
      <p><strong>Besoins:</strong> {{ startup.needs }} €</p>
      <div>
        <strong>Liens externes:</strong>
        <ul>
          <li v-for="url in startup.Ext_url" :key="url">
            <a :href="url" target="_blank">{{ url }}</a>
          </li>
        </ul>
      </div>
      <div v-if="startup.funder && startup.funder.length">
        <strong>Financeurs:</strong>
        <ul>
          <li v-for="f in startup.funder" :key="f.name">
            {{ f.name }} ({{ f.role }}) : {{ f.amount }} €
          </li>
        </ul>
      </div>
    </div>
    <img src="" alt="">
  </section>
  <section v-else>
    <p>Startup introuvable.</p>
  </section>
</template>

<script>
import startups from '@/example/startup.json'

export default {
  name: 'ProjectPage',
  data() {
    return {
      startup: null
    }
  },
  created() {
    const id = Number(this.$route.params.id)
    this.startup = startups.find(s => s.id === id)
  }
}
</script>