<template>
  <section class="homeSect">
    <h2>Welcome to JEB Incubator,</h2>
    <div class="content">
      <div class="intro">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, harum? Ad consequuntur delectus qui
          inventore eius! Laudantium delectus quia dignissimos. Eum beatae sunt voluptatum eaque ducimus illum
          aperiam eius nam.</p>
      </div>

      <section class="dashboard-startups">
        <div class="info">
          <p><strong>Total Startups:</strong> {{ totalStartups }}</p>
          <p><strong>Total Views:</strong> {{ totalViews }}</p>
        </div>
        <h3>Most Viewed Startups</h3>
        <ul class="bestStartups">
          <li v-for="startup in startups.slice(0, 3)" :key="startup.id">
            <router-link :to="{ name: 'project', params: { id: startup._id }, state: { startup } }" class="card-link">
              <h2>{{ startup.name }}</h2>
              <p class="description">Description: {{ startup.description }}</p>
              <p><strong>Secteur:</strong> {{ startup.sector }}</p>
              <p><strong>Address:</strong> {{ startup.address }}</p>
            </router-link>
          </li>
        </ul>
      </section>

    </div>
  </section>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Best Project',
  data() {
    return {
      startups: [],
      originalStartups: [],
      totalViews: 0,
      totalStartups: 0
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5001/startups');
      this.startups = response.data.sort((a, b) => (b.views || 0) - (a.views || 0));
      this.originalStartups = [...this.startups];
      this.totalStartups = this.startups.length;
      this.totalViews = this.startups.reduce((sum, s) => sum + (s.views || 0), 0);
      console.log('Startups loaded:', this.startups);
    } catch (e) {
      console.error('Error startups', e);
    }
  },
}
</script>

<style>
.homeSect {
  background: linear-gradient(135deg, var(--pink4), var(--purple2));
  width: 100%;
  min-height: 100vh;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
}

.homeSect h2 {
  font-size: 2.2rem;
  color: var(--purple5);
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.content {
  width: 100%;
  max-width: 1200px;
}

.intro {
  max-width: 800px;
  margin: 0 auto 2rem auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

.dashboard-startups {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
}

.dashboard-startups .info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  background: var(--purple2);
  border-radius: 18px;
  padding: 1.5rem 2rem;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(193, 116, 242, 0.15);
  text-align: center;
}

.dashboard-startups .info p {
  margin: 0.5rem 1rem;
  font-size: 1rem;
  background: var(--purple3);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  transition: background 0.3s ease, color 0.3s ease;
}

.dashboard-startups .info p strong {
  color: var(--pink1);
}

.dashboard-startups h3 {
  color: var(--pink1);
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.dashboard-startups .bestStartups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.dashboard-startups .bestStartups li {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(241, 133, 133, 0.12);
  border-top: 5px solid var(--purple3);
  padding: 1.5rem 1.2rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease;
  color: #444;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.dashboard-startups .bestStartups li:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 8px 26px rgba(193, 116, 242, 0.18);
  background: var(--purple1);
}

.dashboard-startups .card-link {
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.dashboard-startups h2 {
  font-size: 1.4rem;
  color: var(--purple5);
  margin-bottom: 0.6rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.dashboard-startups .description {
  color: var(--pink2);
  font-size: 1rem;
  margin-bottom: 0.6rem;
  font-weight: 500;
}

.dashboard-startups li:hover h2,
.dashboard-startups li:hover .description {
  color: #fff;
}

/* Responsive */
@media (max-width: 900px) {
  .homeSect {
    padding: 2rem 1rem;
  }

  .intro {
    font-size: 1rem;
  }

  .dashboard-startups .info p {
    font-size: 0.95rem;
    padding: 0.4rem 0.8rem;
  }

  .dashboard-startups .bestStartups {
    gap: 1rem;
    max-width: 90%;
  }
}

@media (max-width: 600px) {
  .homeSect {
    padding: 1rem 0.7rem;
  }

  .homeSect h2 {
    font-size: 1.6rem;
  }

  .intro {
    font-size: 0.95rem;
  }

  .dashboard-startups .info {
    flex-direction: column;
    padding: 1rem 1.2rem;
  }

  .dashboard-startups .info p {
    width: 90%;
    font-size: 0.9rem;
    margin: 0.4rem auto;
  }

  .dashboard-startups .bestStartups {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100%;
  }

  .dashboard-startups .bestStartups li {
    min-width: 100%;
    padding: 0;
  }
}

</style>