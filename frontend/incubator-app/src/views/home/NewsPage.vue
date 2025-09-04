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
import axios from 'axios'

export default {
  name: 'NewsPage',
  data() {
    return {
      newsc: this.$route.state?.news || null
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/news/' + this.$route.params.id);
      console.log('http://localhost:8080/news/', this.$route.params.id);
      this.newsc = response.data[0];
      console.log('News loaded: ', this.newsc);
    } catch (e) {
      console.error('Error news', e)
    }
  }
}
</script>