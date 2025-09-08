<template>
  <div class="about-page">
    <h2>Mission & Vision</h2>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, harum? Ad
      consequuntur delectus qui inventore eius! Laudantium delectus quia
      dignissimos. Eum beatae sunt voluptatum eaque ducimus illum aperiam eius
      nam.
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
    <div class="contact-section">
      <h2>Contact</h2>
      <div class="contact-contact">
        <h3>Contact</h3>
        <p>0692 xx xx xx</p>
        <p>184, JEB Incubator Street, 40404 JEB city</p>
        <p>jeb.incubator@example.com</p>
      </div>
      <div class="contact-nav">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
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

.about-page .contact-section .contact-nav {
    text-align: left;
}
</style>
