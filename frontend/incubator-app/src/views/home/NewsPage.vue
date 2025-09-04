<template>
    <section v-if="newsc">
        <div class="newsc">
            <h2>{{newsc.title}}</h2>
            <!-- <img></img> -->
            <p>{{newsc.hook}}</p>
            <p>{{newsc.text}}</p>
        </div>
    </section>
    <section v-else>
        <p>Pas de news</p>
    </section>
</template>

<script>
import news from '@/example/news.json'

export default {
  name: 'NewsPage',
  data() {
    return {
      newsc: null
    }
  },
  created() {
    const id = Number(this.$route.params.id)
    this.newsc = news.find(s => s.id === id)
  }
}
</script>