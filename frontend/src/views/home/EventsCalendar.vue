<template>
  <div class="calendar">
    <div class="filters">
      <select v-model="selectedYear" @change="changeDate">
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>

      <select v-model="selectedMonth" @change="changeDate">
        <option v-for="(month, index) in months" :key="index" :value="index">
          {{ month }}
        </option>
      </select>
    </div>

    <FullCalendar :options="calendarOptions" ref="calendar" />
  </div>
</template>

<script>
import axios from "axios";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

export default {
  name: "EventsCalendar",
  components: { FullCalendar },
  data() {
    const today = new Date();
    return {
      events: [],
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        locale: "en",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        },
        events: [],
        eventClick: (info) => {
          this.$router.push(`/home/events/${info.event.id}`);
        },
      },
      selectedYear: today.getFullYear(),
      selectedMonth: today.getMonth(),
      years: Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  async created() {
    try {
      const response = await axios({
        url: "/events",
        method: "get",
      });
      this.events = response.data;

      this.calendarOptions.events = this.events.map((event) => ({
        id: event._id,
        title: event.name,
        start: event.dates,
        extendedProps: {
          description: event.description,
          location: event.location,
          type: event.event_type,
          audience: event.target_audience,
        },
      }));
    } catch (e) {
      console.error("Error events", e);
    }
  },
  methods: {
    changeDate() {
      const calendarApi = this.$refs.calendar.getApi();
      const newDate = new Date(this.selectedYear, this.selectedMonth, 1);
      calendarApi.gotoDate(newDate);
    },
  },
};
</script>

<style>
.calendar {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.filters select {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}
</style>
