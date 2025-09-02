<template>
    <section v-if="event">
        <div class="details">
            <h2>{{event.title}}</h2>
            <p>{{event.date}}</p>
            <p>{{event.location}}</p>
            <p>{{event.time}}</p>
            <p>{{event.description}}</p>
        </div>
    </section>
    <section v-else>
        <p>Pas de news</p>
    </section>
</template>

<script>
import events from '@/example/events.json'

export default {
  name: 'EventsPage',
  data() {
    return {
      event: null
    }
  },
  created() {
    const id = Number(this.$route.params.id)
    this.event = events.find(s => s.id === id)
  }
}
</script>