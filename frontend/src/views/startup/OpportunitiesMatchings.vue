<template>
    <section v-if="matching">
        <div class="details">
            <h2>{{matching.name}}</h2>
            <p>{{matching.date}}</p>
            <p>{{matching.location}}</p>
            <p>{{matching.time}}</p>
            <p>{{matching.description}}</p>
        </div>
    </section>
    <section v-else>
        <p>Pas de projet</p>
    </section>
</template>

<script>
import matchings from '@/example/investorsMatching.json'

export default {
  name: 'opportunities-matchings',
  data() {
    return {
      matching: null
    }
  },
  created() {
    const id = Number(this.$route.params.id)
    this.matching = matchings.find(s => s.id == id)
  }
}
</script>