<template>
  <section v-if="matching">
    <div class="details-matching">
      <h2>{{ matching.name }}</h2>
      <h3>Description</h3>
      <p><strong></strong>{{ matching.description }}</p>
      <p><strong>Visit website : </strong>{{ matching.website }}</p>
      <div>
        <strong>Investment Stage : </strong>
        <span v-for="(invest, index) in matching.investmentStage">
          {{ invest }}<template v-if="index !== matching.investmentStage.length - 1">, </template>
        </span>
      </div>
      <div>
        <strong>Sector(s) : </strong>
        <span v-for="(sector, index) in matching.sectors">
          {{ sector }}<template v-if="index !== matching.sectors.length - 1">, </template>
        </span>
      </div>
      <div>
        <strong>Tags : </strong>
        <span v-for="(tag, index) in matching.tags">
          {{ tag }}<template v-if="index !== matching.tags.length - 1">, </template>
        </span>
      </div>
      <h3>Funding Informations</h3>
      <p><strong>Capacity : </strong>{{ matching.fundingCapacity }}</p>
      <h3>Location</h3>
      <p>{{ matching.location }}</p>
      <h3>Contacts</h3>
      <p><strong>Email : </strong>{{ matching.contact.email }}</p>
      <p><strong>Phone : </strong>{{ matching.contact.phone }}</p>
    </div>
  </section>
  <section v-else>
    <p>Pas de projet</p>
  </section>
</template>

<script>
import matchings from "@/example/investorsMatching.json";

export default {
  name: "opportunities-matchings",
  data() {
    return {
      matching: null,
    };
  },
  created() {
    const id = Number(this.$route.params.id);
    this.matching = matchings.find((s) => s.id == id);
  },
};
</script>

<style>

.details-matching strong {
  color: #D5A8F2;
}

.details-matching h3 {
  color: #cb90f1;
  border-color: #cb90f1;
  text-decoration: underline;
}

.details-matching h2 {
  color: #C174F2;
  text-align: center;
}
</style>