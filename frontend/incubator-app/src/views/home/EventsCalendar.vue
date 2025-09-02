<template>
    <div class="calendar">
        <div
            v-for="event in events"
            :key="event.id"
        >
            <router-link :to="`/home/events/${event.id}`">
                <div class="events">
                    <p><strong>{{event.date}}:</strong> {{event.title}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import events from "@/example/events.json"

export default {
    name: 'EventsCalendar',
    data() {
        return {
            events
        }
    }
}
</script>