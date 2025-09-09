<template>
  <div class="about-page">
    <h2>Mission & Vision</h2>
    <p>
      Our mission is to empower startups by connecting them with the right
      investors, mentors, and ressources. We streve to create an ecosytem where
      innovative ideas can grow ith impactful businesses. Our vision is to
      become the leading hub where entrepreuneurs and investors build the future
      together, fostering, innovation, driving sustainable growth, and shaping
      tomorrow's economy.
    </p>
    <h2>Team</h2>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, harum? Ad
      consequuntur delectus qui inventore eius! Laudantium delectus quia
      dignissimos. Eum beatae sunt voluptatum eaque ducimus illum aperiam eius
      nam.
    </p>
    <h2>Partners</h2>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, harum? Ad
      consequuntur delectus qui inventore eius! Laudantium delectus quia
      dignissimos. Eum beatae sunt voluptatum eaque ducimus illum aperiam eius
      nam.
    </p>
    <h2>Contact</h2>
    <div class="contact">
      <div
        class="contact-section"
        v-for="contact in contacts"
        :key="contact.id"
      >
        <img class="contact-img" src="@/assets/pictures/contact.png"/>
        <h3>{{ contact.name }}</h3>
        <p>{{ contact.job }}</p>
        <p>{{ contact.contact }}</p>
      </div>
      <!-- <div class="contact-nav">
        <h3>Navigation</h3>
        <router-link :to="`/`">
          <p>Home</p>
        </router-link>
        <router-link :to="`/home/catalog`">
          <p>Catalog</p>
        </router-link>
        <router-link :to="`/home/news`">
          <p>News</p>
        </router-link>
        <router-link :to="`/home/events`">
          <p>Events</p>
        </router-link>
      </div> -->
    </div>
  </div>
</template>

<script>
import contacts from "@/example/contact.json";

export default {
  name: "AboutPage",
  data() {
    return {
      contacts,
    };
  },
};
</script>

<style>
.about-page h2 {
  color: #f49c9c;
  text-align: center;
}

.about-page p {
  text-align: center;
}

.contact {
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 20px;
}

.contact-section{
  display: grid;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.contact-section h3 {
  text-align: center;
}

.contact-img {
  height: 60px;
  width: auto;
}
</style>
