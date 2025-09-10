<script setup>
  import { RouterLink } from "vue-router"
  import { ref, computed, onMounted } from "vue"
  import axios from "axios"

    const data = ref([])

    const search = ref("")
    const sortKey = ref(null)
    const sortAsc = ref(true)

    const startup = ref({
      sector: "Startups"
    })

    const filter = ref("")

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
        let result = [];

        if (filter.value == "Startups") {
            result = data.value.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.sector.toLowerCase().includes(term) ||
            item.maturity.toLowerCase().includes(term) ||
            String(item.founders).toLowerCase().includes(term)
          )
        }

        if (filter.value == "Users") {
            result = data.value.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.email.toLowerCase().includes(term) ||
            item.role.toLowerCase().includes(term) ||
            String(item.founders).toLowerCase().includes(term)
          )
        }

        if (filter.value == "Projects") {
            result = data.value.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.project_status.toLowerCase().includes(term) ||
            item.needs.toLowerCase().includes(term) ||
            item.sector.toLowerCase().includes(term) ||
            String(item.founders).toLowerCase().includes(term)
          )
        }

        if (sortKey.value) {
        result.sort((a, b) => {
            if (a[sortKey.value] < b[sortKey.value]) return sortAsc.value ? -1 : 1
            if (a[sortKey.value] > b[sortKey.value]) return sortAsc.value ? 1 : -1
            return 0
        })
        }
        return result
    })

    const focus = ref({ name: "" })

    const focused = (item) => {
        focus.value = item
    }

    const clearFocus = () => {
        focus.value = { name: "" }
    }

    const getData = async (option) => {
      try {
        if (option == "Startups") {
          const response = await axios.get(`/startups`);
          return response.data;
        }
        if (option == "Users") {
          const response = await axios.get(`/users`);
          return response.data;
        }
        if (option == "Projects") {
          const response = await axios.get(`/projects`);
          return response.data;
        }
        return [];
      } catch (e) {
        alert("Error Startup");
        console.log("Error loading Startups:", e);
        return [];
      }
    }

    const refreshData = async () => {
      data.value = await getData(filter.value)
      clearFocus();
    }

    onMounted( async () => {
      filter.value = "Startups";
      data.value = await getData(filter.value);
    });

</script>

<template>

  <div>
    <select id="filter" v-model="filter" @change="refreshData">
      <option disabled value="">-- Select an option --</option>
      <option value="Startups">Startups</option>
      <option value="Users">Users</option>
      <option value="Projects">Projects</option>
    </select>

    <p>Selected value: {{ filter }}</p>
  </div>

  <form>
    <div class="fx fx-gap">
      <div>
        <input v-model="search" type="text" placeholder="Search" required />
      </div>
    </div>
  </form>



    <!-- Focused startup for management -->
      <div v-if="focus.name" class="focus-card">
        <button class="close-btn" @click="clearFocus">x</button>

        <router-link v-if="filter == `Startups`" :to="{ name: 'admin-project', params: { id: focus._id } }"
                    class="btn-edit">
          Edit
        </router-link>

        <!-- <router-link v-if="filter == `Users`" :to="{ name: 'admin-user', params: { id: focus._id } }"
                    class="btn-edit">
          Edit
        </router-link> -->

        <!-- <router-link v-if="filter == `Projects`" :to="{ name: 'admin-project', params: { id: focus._id } }"
                    class="btn-edit">
          Edit
        </router-link> -->

        <div v-if="filter == `Startups`" class="focus-info">
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

        <div v-if="filter == `Users`" class="focus-info">
          <p><strong>ID :</strong> {{ focus.id }}</p>
          <p><strong>Name :</strong> {{ focus.name }}</p>
          <p><strong>Role :</strong> {{ focus.role }}</p>
          <p><strong>Email :</strong> {{ focus.email }}</p>
        </div>

        <div v-if="filter == `Projects`" class="focus-info">
          <p><strong>Name :</strong> {{ focus.name }}</p>
          <p><strong>Description :</strong> {{ focus.description }}</p>
          <p><strong>Status :</strong> {{ focus.legal_status }}</p>
          <p><strong>Needs :</strong> {{ focus.needs }}</p>
          <p><strong>Sector :</strong> {{ focus.sector }}</p>
        </div>

      </div>



  <!-- Table for searches -->
  <h2>Admin Search Table</h2>
  <div class="table-wrapper">

    <table v-if="filter == `Startups`" class="fl-table">
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

    <table v-if="filter == `Users`" class="fl-table">
        <thead>
        <tr>
          <th @click="sortBy('id')">#</th>
          <th @click="sortBy('name')">Nom</th>
          <th @click="sortBy('email')">Email</th>
          <th @click="sortBy('role')">Role</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredData" :key="index">
            <td @click=focused(item) >{{ item.id }}</td>
            <td @click=focused(item) >{{ item.name }}</td>
            <td @click=focused(item) >{{ item.email }}</td>
            <td @click=focused(item) >{{ item.role }}</td>
          </tr>
      </tbody>
    </table>

    <table v-if="filter == `Projects`" class="fl-table">
        <thead>
        <tr>
          <th @click="sortBy('name')">Name</th>
          <th @click="sortBy('project_status')">Status</th>
          <th @click="sortBy('needs')">Needs</th>
          <th @click="sortBy('sector')">Sector</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredData" :key="index">
            <td @click=focused(item) >{{ item.name }}</td>
            <td @click=focused(item) >{{ item.project_status }}</td>
            <td @click=focused(item) >{{ item.needs }}</td>
            <td @click=focused(item) >{{ item.sector }}</td>
          </tr>
      </tbody>
    </table>

  </div>

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
  box-shadow: 0px 15px 50px rgba(0, 0, 0, 0.2);
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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
  background: var(--pink1);
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

.btn-edit {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: var(--pink1);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-edit:hover {
  background-color: var(--purple4);
}

</style>