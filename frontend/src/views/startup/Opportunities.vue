<template>
    <nav>
        <router-link to="/startup/profile">Profile</router-link> |
        <router-link to="/startup/messaging">Chat</router-link> |
        <router-link to="/startup/opportunities">Opportunities</router-link>
    </nav>
    <div class="opportunities-css">
        <h1>Calls for project</h1>
        <h1>Funding opportunities</h1>
        <h1>Investors matches</h1>
    </div>
</template>

<script>

export default {
    name: "Opportunities",
}

</script>

<style>

.opportunities-css h1{
    color: #CB90F1;
}
</style>