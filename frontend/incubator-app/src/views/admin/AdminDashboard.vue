<script setup>
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

    <div>
        <!-- Search for table -->
        <input
            v-model="search"
            placeholder="Search by Name"
        />
    </div>

    <!-- Table for searches -->
    <div>
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
    </div>

    <!-- Focused startup for management -->
    <div v-if="focus">
        <p>Focused Project for management</p>
        {{ focus.id }}
        {{ focus.startup }}
        {{ focus.project }}
        {{ focus.founders }}
        {{ focus.Views }}
        {{ focus.Objective }}
    </div>

</template>