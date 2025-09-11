<template>
  <nav>
    <ul>
      <li>
        <router-link to="/startup/dashboard">Dashboard</router-link>
      </li>
      <li>
        <router-link to="/startup/profile">Profile</router-link>
      </li>
      <li>
        <router-link to="/startup/messaging">Chat</router-link>
      </li>
      <li>
        <router-link to="/startup/opportunities">Opportunities</router-link>
      </li>
    </ul>
  </nav>
  <div class="opportunities-css">
    <h1>Calls for project</h1>
    <div class="calls">
      <div v-for="calling in calls" :key="calling.id" class="call-item">
        <router-link :to="`/startup/opportunities/${calling.id}`" class="section">
          <h3>{{ calling.title }}</h3>
          <p>{{ calling.description }}</p>
          <p><strong>Deadline: </strong> {{ calling.deadline }}</p>
        </router-link>
      </div>
    </div>
    <h1>Funding opportunities</h1>
    <div class="fundings">
      <div v-for="funding in fundings" :key="funding.id" class="fundings-item">
        <router-link :to="`/startup/opportunities/fundings/${funding.id}`" class="section">
          <h3>{{ funding.title }}</h3>
          <p>{{ funding.description }}</p>
          <p><strong>Deadline: </strong>{{ funding.deadline }}</p>
        </router-link>
      </div>
    </div>
    <h1>Investors matches</h1>
    <div class="matchings">
      <div v-for="matching in matchings" :key="matching.id" class="matchings-item">
        <router-link :to="`/startup/opportunities/matchings/${matching.id}`" class="section">
          <h3>{{ matching.name }}</h3>
          <p>{{ matching.description }}</p>
          <p>
            <strong>Funding Capacity: </strong>{{ matching.fundingCapacity }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import calls from "@/example/callProject.json";
import fundings from "@/example/funding.json";
import matchings from "@/example/investorsMatching.json";

export default {
  name: "Opportunities",
  data() {
    return {
      calls,
      fundings,
      matchings,
    };
  },
};
</script>

<style scoped>
nav {
  background: var(--purple5);
  padding: 0.8rem 1.5rem;
}

nav ul {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

nav a:hover {
  color: var(--pink4);
}


.opportunities-css h1 {
  color: #cb90f1;
  text-align: center;
  align-items: center;
}

.calls {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 20px;
}

.call-item {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.35s ease,
    color 0.35s ease;
  border-top: 5px solid #c174f2;
  color: #c174f2;
}

.call-item:hover {
  transform: translateY(-6px);
  background: #c174f2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  color: #fff;
}

.fundings {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 20px;
}

.fundings-item {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.35s ease,
    color 0.35s ease;
  border-top: 5px solid #c174f2;
  color: #c174f2;
}

.fundings-item:hover {
  transform: translateY(-6px);
  background: #c174f2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  color: #fff;
}

.matchings {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 20px;
}

.matchings-item {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.35s ease,
    color 0.35s ease;
  border-top: 5px solid #c174f2;
  color: #c174f2;
}

.matchings-item:hover {
  transform: translateY(-6px);
  background: #c174f2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  color: #fff;
}
</style>
