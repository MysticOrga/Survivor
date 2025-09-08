<template>
  <section v-if="event">
    <div class="details">
      <h2>{{ event.name }}</h2>
      <p>{{ event.description }}</p>
      <p><strong>Date: </strong>{{ event.dates }}</p>
      <p><strong>Location: </strong>{{ event.location }}</p>
      <p><strong>Event type: </strong>{{ event.event_type }}</p>
      <p><strong>Target Audience: </strong>{{ event.target_audience }}</p>
    </div>
  </section>
  <section v-else>
    <p>Pas de news</p>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "EventsPage",
  data() {
    return {
      event: this.$route.state?.events || null,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `http://localhost:5001/events/` + this.$route.params.id
      );
      this.event = response.data[0];
      console.log("Events loaded: ", this.event);
    } catch (e) {
      console.error("Error events", e);
    }
  },
};
</script>

<style>
.details h2 {
  color: #cb90f1;
  text-decoration: underline;
}

.details strong {
  color: #d5a8f2;
}
</style>
