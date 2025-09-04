<template>
    <section v-if="event">
        <div class="details">
            <h2>{{event.name}}</h2>
            <p>{{event.dates}}</p>
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
import axios from 'axios'

export default {
  name: 'EventsPage',
  data() {
    return {
      event: this.$route.state?.events || null
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5001/events/' + this.$route.params.id);
      console.log('http://localhost:5001/events/', this.$route.params.id);
      this.event = response.data[0];
      console.log('Events loaded: ', this.event);
    } catch (e) {
      console.error('Error events', e)
    }
  }
}
</script>