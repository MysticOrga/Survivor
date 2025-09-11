<template>
  <section v-if="project">
    <div class="details-project">
      <h2>{{ project.title }}</h2>
      <h3>Description</h3>
      <p>{{ project.description }}</p>
      <div>
        <strong>Theme : </strong>
        <span v-for="(tag, index) in project.tags">
          {{ tag
          }}<template v-if="index !== project.tags.length - 1">, </template>
        </span>
      </div>
      <h3>Details</h3>
      <p><strong>Category : </strong>{{ project.category }}</p>
      <p><strong>Status : </strong>{{ project.status }}</p>
      <p><strong>Deadline : </strong>{{ project.deadline }}</p>
      <p><strong>Submission :</strong> {{ project.submissionUrl }}</p>
      <h3>Funding informations</h3>
      <div v-if="project.funding.available == true">
        <p><strong>Amount : </strong>{{ project.funding.amount }}</p>
        <p><strong>Type : </strong>{{ project.funding.type }}</p>
      </div>
      <div v-else>
        <p>No fundings</p>
      </div>
      <h3>Location</h3>
      <p>{{ project.location }}</p>
      <h3>Contacts</h3>
      <p><strong>Email : </strong>{{ project.contact.email }}</p>
      <p><strong>Phone : </strong>{{ project.contact.phone }}</p>
    </div>
  </section>
  <section v-else>
    <p>Pas de projet</p>
  </section>
</template>

<script>
import projects from "@/example/callProject.json";

export default {
  name: "opportunities-project",
  data() {
    return {
      project: null,
    };
  },
  created() {
    const id = Number(this.$route.params.id);
    this.project = projects.find((s) => s.id == id);
  },
};
</script>

<style>

.details-project strong {
  color: #D5A8F2;
}

.details-project h3 {
  color: #cb90f1;
  border-color: #cb90f1;
  text-decoration: underline;
}

.details-project h2 {
  color: #C174F2;
  text-align: center;
}
</style>
