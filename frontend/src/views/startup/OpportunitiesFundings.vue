<template>
    <section v-if="funding">
        <div class="details">
            <h2>{{funding.title}}</h2>
            <p>{{funding.date}}</p>
            <p>{{funding.location}}</p>
            <p>{{funding.time}}</p>
            <p>{{funding.description}}</p>
        </div>
    </section>
    <section v-else>
        <p>Pas de projet</p>
    </section>
</template>

<script>
import fundings from '@/example/funding.json'

export default {
  name: 'opportunities-fundings',
  data() {
    return {
      funding: null
    }
  },
  created() {
    const id = Number(this.$route.params.id)
    this.funding = fundings.find(s => s.id == id)
  }
}
</script>