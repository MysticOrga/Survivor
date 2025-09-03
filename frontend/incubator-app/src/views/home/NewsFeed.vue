<template>
    <div class="news">
        <div
        v-for="newsc in news"
        :key="newsc.id"
        class="news-item"
        >
            <router-link :to="`/home/news/${newsc.id}`">
                <div class="section">
                    <h2>{{newsc.title}}</h2>
                    <p>{{newsc.hook}}</p>
                    <p>{{newsc.text}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import news from '@/example/news.json'

export default {
    name: 'NewsFeed',
    data() {
        return {
            news
        }
    }
}
</script>

<style>
.news {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 20px;
}

.news-item {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.35s ease, color 0.35s ease;
  border-top: 5px solid var(--purple3);
  color: #444;
}

.news-item:hover {
  transform: translateY(-6px);
  background: #D5A8F2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  color: #fff;
}

.news-item h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--purple5);
  transition: color 0.35s ease;
}

.news-item p {
  font-size: 14px;
  margin-bottom: 8px;
  transition: color 0.35s ease;
}

.news-item .description {
  font-size: 15px;
  margin-bottom: 12px;
}

.news-item:hover h2,
.news-item:hover p {
  color: #fff;
}

.news-item-link {
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

.news-item:hover .ext-link {
  background: #fff;
  color: var(--purple5);
}
</style>