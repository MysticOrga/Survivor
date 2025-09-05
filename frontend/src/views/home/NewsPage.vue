<template>
  <section v-if="newsc">
    <div class="newsc">
      <h2>{{ newsc.title }}</h2>
      <!-- <img></img> -->
      <p><strong>Date: </strong>{{ newsc.news_date }}</p>
      <p><strong>Location: </strong>{{ newsc.location }}</p>
      <p><strong>Category: </strong>{{ newsc.category }}</p>
      <p>{{ newsc.description }}</p>
    </div>
  </section>
  <section v-else>
    <p>Pas de news</p>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "NewsPage",
  data() {
    return {
      newsc: this.$route.state?.news || null,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/news/` + this.$route.params.id
      );
      console.log(response.data);
      this.newsc = response.data[0];
      console.log("News loaded: ", this.newsc);
    } catch (e) {
      console.error("Error news", e);
    }
  },
};
</script>

<style>
.newsc h2 {
  color: #f18585;
  text-decoration: underline;
}

.newsc strong {
  color: #f49c9c;
}
</style>
