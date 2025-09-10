<template>
    <section v-if="project">
        <div class="details">
            <h2>{{project.title}}</h2>
            <p>{{project.date}}</p>
            <p>{{project.location}}</p>
            <p>{{project.time}}</p>
            <p>{{project.description}}</p>
        </div>
    </section>
    <section v-else>
        <p>Pas de projet</p>
    </section>
</template>

<script>
import projects from '@/example/callProject.json'

export default {
  name: 'opportunities-project',
  data() {
    return {
      project: null
    }
  },
  created() {
    const id = Number(this.$route.params.id)
    this.project = projects.find(s => s.id == id)
  }
}
</script>