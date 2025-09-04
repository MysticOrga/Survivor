<template>
    <div class="calendar">
        <div
            v-for="event in events"
            :key="event.id"
            class="card-block"
        >
            <router-link :to="`/home/events/${event.id}`" class="event-link">
                    <h2>{{ event.name }}</h2>
                    <p>{{ event.description }}</p>
                    <p><strong>Location: </strong>{{ event.location }}</p>
                    <p><strong>Date:</strong> {{event.dates}}</p>
                    <p><strong>Event type:</strong> {{ event.event_type }}</p>
                    <p><strong>Target audience: </strong> {{ event.target_audience }}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import events from "@/example/events.json"
import axios from 'axios'

export default {
    name: 'EventsCalendar',
    data() {
        return {
            events: []
        }
    },
    async created() {
    try {
        const response = await axios.get('http://localhost:8080/events');
        this.events = response.data;
        console.log('Events loaded:', this.events);
      } catch (e) {
        console.error('Error events', e);
      }
    }
}
</script>

<style>
.calendar {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 20px;
}

.card-block {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.35s ease, color 0.35s ease;
  border-top: 5px solid var(--purple3);
  color: #444;
}

.card-block:hover {
  transform: translateY(-6px);
  background: #EED5FB;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  color: #C174F2;
}

.card-block h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--purple5);
  transition: color 0.35s ease;
}

.card-block p {
  font-size: 14px;
  margin-bottom: 8px;
  transition: color 0.35s ease;
}

.card-block .description {
  font-size: 15px;
  margin-bottom: 12px;
}

.card-block:hover h2,
.card-block:hover p {
  color: #C174F2;
}

.event-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.ext-link {
  display: inline-block;
  margin-top: 10px;
  padding: 6px 12px;
  background: var(--pink2);
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.25s ease, color 0.25s ease;
}

.card-block:hover .ext-link {
  background: #fff;
  color: var(--purple5);
}
</style>