<template>
    <nav>
        <ul>
            <li>
                <router-link to="/startup/dashboard">Dashboard</router-link>
            </li>
            <li>
                <router-link to="/startup/profile">Profile</router-link>
            </li>
            <li>
                <router-link to="/startup/messaging">Chat</router-link>
            </li>
            <li>
                <router-link to="/startup/opportunities">Opportunities</router-link>
            </li>
        </ul>
    </nav>
    <div class="">Profile</div>
</template>

<style scoped>
nav {
    background: var(--purple5);
    padding: 0.8rem 1.5rem;
}

nav ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;
}

nav a:hover {
    color: var(--pink4);
}
</style>