<template>
    <div class="profile">
        <div v-for="info in profile">
            <!-- <img></img> -->
            <h2>{{ info.name }}</h2>
            <p><strong>Fondateur(s):</strong> {{ info.founders }}</p>
            <p><strong>Crée en/le:</strong> {{ info.created }}</p>
            <p><strong>Localisation:</strong> {{ info.located }}</p>
            <p><strong>Téléphone :</strong> {{ info.phone }}</p>
            <p></p>
            <p><strong>Capital:</strong> {{ info.capital }}</p>
            <p><strong>Secteur:</strong> {{ info.sector }}</p>
            <p><strong>SIRET:</strong> {{ info.SIRET }}</p>
            <p><strong>Effectif(s):</strong> {{ info.effectif }}</p>
            <p><strong>Vos projets:</strong> {{ info.project }}</p>
        </div>
    </div>
</template>

<script>
import profile from '@/example/profile.json'

export default {
    name: "StartupProfile",
    data() {
        return {
            profile
        }
    }
}
</script>