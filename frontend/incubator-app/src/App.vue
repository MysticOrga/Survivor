<template>
  <div class="wrapper">
    <header>
      <div class="headBar">
        <div class="title">
          <h1>Incubator</h1>
          <img src="" alt="">
        </div>
        <div class="tools">
          <ul>
            <li>
              <a href="#">Register</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
        </div>
      </div>
      <nav>
        <ul>
          <li><router-link to="/home/catalog">Catalog</router-link></li>
          <li><router-link to="/home/news">News</router-link></li>
          <li><router-link to="/home/events">Events</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
