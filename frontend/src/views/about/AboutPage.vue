<template>
  <div class="about-page">
    <h2>Mission & Vision</h2>
    <p>
      Our mission is to empower startups by connecting them with the right
      investors, mentors, and resources. We strive to create an ecosystem where
      innovative ideas can grow into impactful businesses. Our vision is to
      become the leading hub where entrepreneurs and investors build the future
      together, fostering innovation, driving sustainable growth, and shaping
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
    <div class="carousel">
      <button @click="prev" class="carousel-btn">‹</button>

      <transition name="fade" mode="out-in">
        <div class="carousel-slide" :key="partners[current]?.id">
          <div v-if="partners.length">
            <h3>{{ partners[current].name }}</h3>
            <p>{{ partners[current].email }}</p>
            <p>{{ this.current + 1 }}/{{ this.partners.length }}</p>
          </div>
          <div v-else>
            <p>Loading partners...</p>
          </div>
        </div>
      </transition>

      <button @click="next" class="carousel-btn">›</button>
    </div>

    <h2>Contact</h2>
    <div class="contact">
      <div
        class="contact-section"
        v-for="contact in contacts"
        :key="contact.id"
      >
        <img class="contact-img" src="@/assets/pictures/contact.png" />
        <h3>{{ contact.name }}</h3>
        <p>{{ contact.job }}</p>
        <p>{{ contact.contact }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import contacts from "@/example/contact.json";

export default {
  name: "AboutPage",
  data() {
    return {
      contacts,
      partners: [],
      current: 0,
      visibillity: 3,
    };
  },
  async created() {
    try {
      const response = await axios({
        url: "/partners",
        method: "get"
      });
      this.partners = response.data;
    } catch (e) {
      console.error("Error loading partners:", e);
    }
  },
  methods: {
    next() {
      if (this.partners.length) {
        this.current = (this.current + 1) % this.partners.length;
      }
    },
    prev() {
      if (this.partners.length) {
        this.current =
          (this.current - 1 + this.partners.length) % this.partners.length;
      }
    },
  },
};
</script>

<style>
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.carousel-slide {
  width: 300px;
  text-align: center;
  background: #fff;
  padding: 20px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.carousel-btn {
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}

.carousel-btn:hover {
  color: #f49c9c;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.about-page h2 {
  color: #f49c9c;
  text-align: center;
  margin-top: 40px;
}

.about-page p {
  text-align: center;
  margin-bottom: 20px;
}

.contact {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-section {
  display: flex;
  align-items: center;
  justify-content: center;
  display: grid;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.contact-img {
  height: 60px;
  width: auto;
  margin: 0 auto 10px;
}
</style>
