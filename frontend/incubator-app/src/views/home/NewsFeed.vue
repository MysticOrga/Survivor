<template>
    <div class="news">
        <div
        v-for="newsc in news"
        :key="newsc.id"
        >
            <router-link :to="`/home/news/${newsc.id}`">
                <div class="section">
                    <h2>{{newsc.title}}</h2>
                    <!-- <img></img> -->
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
