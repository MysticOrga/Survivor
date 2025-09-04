<script setup>
    import { RouterLink } from "vue-router"
import { fakedata } from "../../data/admin.js"
    import { ref, computed } from "vue"

    const data = ref(fakedata)

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
            item.startup.toLowerCase().includes(term) ||
            item.project.toLowerCase().includes(term) ||
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

    const focused = (item) => {
        focus.value = item
    }


</script>

<template>

  <form>
    <div class="fx fx-gap">
      <div>
        <input v-model="search" type="text" placeholder="Search" required />
      </div>
      <div id="search-icon">
        <button type="submit">
          <div id="search-icon-circle"></div>
          <span></span>
        </button>
      </div>
    </div>
  </form>

  <!-- Table for searches -->
  <h2>Admin Search Table</h2>
  <div class="table-wrapper">
    <table class="fl-table">
        <thead>
        <tr>
          <th @click="sortBy('id')">#</th>
          <th @click="sortBy('startup')">Start-up</th>
          <th @click="sortBy('project')">Project Name</th>
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

    <!-- Focused startup for management -->
    <div v-if="focus" class="focus-card">
      <router-link to="/">
      <h2>Focused Project</h2>
      </router-link>

      <div class="focus-info">
        <p><strong>ID :</strong> {{ focus.id }}</p>
        <p><strong>Startup :</strong> {{ focus.startup }}</p>
        <p><strong>Project :</strong> {{ focus.project }}</p>
        <p><strong>Founders :</strong> {{ focus.founders }}</p>
        <p><strong>Views :</strong> {{ focus.Views }}</p>
        <p><strong>Objective :</strong> {{ focus.Objective }}</p>
      </div>
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
  position: absolute;
  top: 14%;
  left: 75%;
  right: 0;
  width: 500px;
  height: 70px;
  padding: 35px;
  margin: -83px auto 0 auto;
  background-color: var(--pink3);
  border-radius: 20px;
  box-shadow: 0 10px 40px var(--pink1), 0 0 0 20px #ffffffeb;
  transform: scale(0.45);
}

input[type="text"] {
  width: 100%;
  height: 80px;
  font-size: 50px;
  line-height: 1;
}

input[type="text"]::placeholder {
  color: var(--pink1);
}

button {
  position: relative;
  display: block;
  width: 80px;
  height: 80px;
  cursor: pointer;
}

#search-icon-circle {
  position: relative;
  top: -8px;
  left: 0;
  width: 43px;
  height: 43px;
  margin-top: 0;
  border-width: 15px;
  border: 15px solid #fff;
  background-color: transparent;
  border-radius: 50%;
  transition: 0.5s ease all;
}

button span {
  position: absolute;
  top: 68px;
  left: 43px;
  display: block;
  width: 45px;
  height: 15px;
  background-color: transparent;
  border-radius: 10px;
  transform: rotateZ(52deg);
  transition: 0.5s ease all;
}

button span:before,
button span:after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 45px;
  height: 15px;
  background-color: #fff;
  border-radius: 10px;
  transform: rotateZ(0);
  transition: 0.5s ease all;
}

#search-icon:hover #search-icon-circle {
  top: -1px;
  width: 67px;
  height: 15px;
  border-width: 0;
  background-color: #fff;
  border-radius: 20px;
}

#search-icon:hover span {
  top: 50%;
  left: 56px;
  width: 25px;
  margin-top: -9px;
  transform: rotateZ(0);
}

#search-icon:hover button span:before {
  bottom: 11px;
  transform: rotateZ(52deg);
}

#search-icon:hover button span:after {
  bottom: -11px;
  transform: rotateZ(-52deg);
}
#search-icon:hover button span:before,
#search-icon:hover button span:after {
  right: -6px;
  width: 40px;
  background-color: #fff;
}

/* Table */
.table-wrapper{
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
}

.fl-table thead th {
    color: #ffffff;
    background: var(--pink4);
}


.fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: var(--pink3);
}

.fl-table tr:nth-child(even) {
    background: var(--purple1);
}

/* Responsive */
@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
    }
    .fl-table thead th {
        text-align: left;
        border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
        background: none;
    }
    .fl-table tr:nth-child(even) {
        background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
        background: #F8F8F8;
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tr td:nth-child(even) {
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tbody td {
        display: block;
        text-align: center;
    }
}

/* Focused Item */

.focus-card {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px 25px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Roboto, sans-serif;
  color: #333;
}

.focus-card {
  margin-bottom: 15px;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--pink1);
  text-align: center;
}

.focus-info {
  margin: 8px 0;
  font-size: 1rem;
  line-height: 1.4;
}

.focus-info strong {
  color: #555;
}

</style>