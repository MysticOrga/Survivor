<template>
  <section v-if="funding">
    <div class="details-funding">
      <h2>{{ funding.title }}</h2>
      <h3>Description</h3>
      <p>{{ funding.description }}</p>
      <div>
        <strong>Theme : </strong>
        <span v-for="(tag, index) in funding.tags">
          {{ tag
          }}<template v-if="index !== funding.tags.length - 1">, </template>
        </span>
      </div>
      <h3>Details</h3>
      <p><strong>Category : </strong>{{ funding.category }}</p>
      <p><strong>Status : </strong>{{ funding.status }}</p>
      <p><strong>Deadline : </strong>{{ funding.deadline }}</p>
      <p><strong>Submission :</strong> {{ funding.submissionUrl }}</p>
      <h3>Funding informations</h3>
        <p><strong>Amount : </strong>{{ funding.fundingAmount }}</p>
        <p><strong>Type : </strong>{{ funding.fundingType }}</p>
      <h3>Location</h3>
      <p>{{ funding.location }}</p>
      <h3>Contacts</h3>
      <p><strong>Email : </strong>{{ funding.contact.email }}</p>
      <p><strong>Phone : </strong>{{ funding.contact.phone }}</p>
    </div>
  </section>
  <section v-else>
    <p>Pas de projet</p>
  </section>
</template>

<script>
import fundings from "@/example/funding.json";

export default {
  name: "opportunities-fundings",
  data() {
    return {
      funding: null,
    };
  },
  created() {
    const id = Number(this.$route.params.id);
    this.funding = fundings.find((s) => s.id == id);
  },
};
</script>

<style>

.details-funding strong {
  color: #D5A8F2;
}

.details-funding h3 {
  color: #cb90f1;
  border-color: #cb90f1;
  text-decoration: underline;
}

.details-funding h2 {
  color: #C174F2;
  text-align: center;
}
</style>