<script setup>
  import { RouterLink } from "vue-router"
  import { ref, computed, onMounted } from "vue"
  import axios from "axios"

    const data = ref([])

    const search = ref("")
    const sortKey = ref(null)
    const sortAsc = ref(true)

    const sortBy = (key) => {
        if (sortKey.value === key) {
            sortAsc.value = !sortAsc
        } else {
            sortKey.value = key
            sortAsc.value = true
        }
    }

    const filteredData = computed(() => {
        let term = search.value.toLowerCase()
        let result = data.value.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.sector.toLowerCase().includes(term) ||
            item.maturity.toLowerCase().includes(term) ||
            String(item.founders).toLowerCase().includes(term)
        )

        if (sortKey.value) {
        result.sort((a, b) => {
            if (a[sortKey.value] < b[sortKey.value]) return sortAsc.value ? -1 : 1
            if (a[sortKey.value] > b[sortKey.value]) return sortAsc.value ? 1 : -1
            return 0
        })
        }
        return result
    })

    const focus = ref(null)
    focus.id = -1

    const focused = (item) => {
        focus.value = item
    }

    const clearFocus = () => {
      focus.value = ref(null)
      focus.id = -1
    }

    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/startups');
        return response.data;
      } catch (e) {
        alert("Error Startup");
        console.log("Error loading Startups");
        return [];
      }
    }

    onMounted( async () => {
      data.value = await getData();
    });

</script>

<template>

  <form>
    <div class="fx fx-gap">
      <div>
        <input v-model="search" type="text" placeholder="Search" required />
      </div>
    </div>
  </form>

    <!-- Focused startup for management -->
    <div v-if="focus">
      <div v-if="focus .id> 0" class="focus-card">
        <button class="close-btn" @click="clearFocus">x</button>
        <router-link to="/">
          <h2>Focused Project</h2>
        </router-link>

        <div class="focus-info">
          <p><strong>ID :</strong> {{ focus.id }}</p>
          <p><strong>Name :</strong> {{ focus.name }}</p>
          <p><strong>Sector :</strong> {{ focus.sector }}</p>
          <p><strong>Status :</strong> {{ focus.legal_status }}</p>
          <p><strong>Address :</strong> {{ focus.address }}</p>
          <p><strong>Email :</strong> {{ focus.email }}</p>
          <p><strong>Phone :</strong> {{ focus.phone }}</p>
          <p><strong>Maturity :</strong> {{ focus.maturity }}</p>
          <p><strong>Views :</strong> {{ focus.views }}</p>
        </div>

      </div>
    </div>

  <!-- Table for searches -->
  <h2>Admin Search Table</h2>
  <div class="table-wrapper">
    <table class="fl-table">
        <thead>
        <tr>
          <th @click="sortBy('id')">#</th>
          <th @click="sortBy('name')">Start-up</th>
          <th @click="sortBy('sector')">Sector</th>
          <th @click="sortBy('maturity')">Maturity</th>
          <th @click="sortBy('views')">Views</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredData" :key="index">
            <td @click=focused(item) >{{ item.id }}</td>
            <td @click=focused(item) >{{ item.name }}</td>
            <td @click=focused(item) >{{ item.sector }}</td>
            <td @click=focused(item) >{{ item.maturity }}</td>
            <td @click=focused(item) >{{ item.views }}</td>
          </tr>
      </tbody>
    </table>
  </div>

    <!-- <div>
        <table>
            <thead>
                <tr>
                    <th @click="sortBy('id')">#</th>
                    <th @click="sortBy('startup')">Start-up</th>
                    <th @click="sortBy('project')">Project Name</th>
                    <th @click="sortBy('founders')">Number of founders</th>
                    <th @click="sortBy('views')">Views</th>
                    <th @click="sortBy('objective')">Objective</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in filteredData" :key="index">
                    <td @click=focused(item) >{{ item.id }}</td>
                    <td @click=focused(item) >{{ item.startup }}</td>
                    <td @click=focused(item) >{{ item.project }}</td>
                </tr>
            </tbody>
        </table>
    </div> -->

</template>

<style scoped>

/* Search bar */
.fx {
  display: flex;
}

.fx-gap {
  gap: 18px;
}

input,
button {
  color: #fff;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: transparent;
  outline: none;
}

form {
  position: relative;
  max-width: 600px;
  width: 90%;
  height: auto;
  padding: 1rem;
  margin: 1rem auto;
  background-color: var(--pink3);
  border-radius: 20px;
  box-shadow: 0 10px 40px var(--pink1), 0 0 0 10px #ffffffeb;
}


input[type="text"] {
  width: 100%;
  height: 3rem;
  font-size: 1.2rem;
  line-height: 1;
}

input[type="text"]::placeholder {
  color: var(--pink1);
}

.table-wrapper {
  margin: 10px auto;
  padding: 0 1rem;
  box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);
  overflow-x: auto; /* ✅ allows scroll on small screens */
}

.fl-table {
  border-radius: 5px;
  font-size: 0.95rem; /* ✅ relative font size */
  border: none;
  border-collapse: collapse;
  width: 100%;
  background-color: white;
  min-width: 600px; /* ✅ keeps it readable on large screens */
}

.fl-table td,
.fl-table th {
  text-align: center;
  padding: 0.75rem;
  word-wrap: break-word;
}

.fl-table td {
  border-right: 1px solid #f8f8f8;
}

.fl-table thead th {
  color: #ffffff;
  background: var(--pink4);
}

.fl-table thead th:nth-child(odd) {
  background: var(--pink3);
}

.fl-table tr:nth-child(even) {
  background: var(--purple1);
}

/* 📱 Responsive for tablets and below */
@media (max-width: 1024px) {
  .fl-table {
    font-size: 0.85rem;
    min-width: 500px;
  }
  .fl-table td,
  .fl-table th {
    padding: 0.6rem;
  }
}

/* 📱 Mobile */
@media (max-width: 768px) {
  .table-wrapper {
    overflow-x: auto;
  }

  .fl-table {
    font-size: 0.8rem;
    min-width: 450px; /* ✅ allow scroll but keep readable */
  }
  .fl-table td,
  .fl-table th {
    padding: 0.5rem;
  }
}

/* 📱 Extra small screens */
@media (max-width: 480px) {
  .fl-table {
    font-size: 0.75rem;
    min-width: 400px;
  }
}


/* Focused Item */
.focus-card {
  position: relative;
  max-width: 500px;
  width: 90%;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.focus-card h2 {
  margin: 0 0 1rem;
  font-size: 1.3rem;
  color: var(--pink3);
  text-align: center;
}

.focus-info p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: #e91e63;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #d81b60;
}

/* ------------------ */
/*  Responsive        */
/* ------------------ */
@media (max-width: 1024px) {
  .fl-table {
    font-size: 0.9rem;
    min-width: 500px;
  }
}

@media (max-width: 768px) {
  form {
    flex-direction: column;
    gap: 0.5rem;
  }
  input[type="text"] {
    font-size: 0.9rem;
    height: 2.5rem;
  }
  button {
    width: 2.5rem;
    height: 2.5rem;
  }
  .fl-table {
    font-size: 0.85rem;
    min-width: 450px;
  }
  .focus-card {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  input[type="text"] {
    font-size: 0.8rem;
    height: 2.2rem;
  }
  .fl-table {
    font-size: 0.8rem;
    min-width: 400px;
  }
  .focus-info p {
    font-size: 0.9rem;
  }
}
</style>