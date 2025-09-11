<template>
  <div class="notfound">
    <h1 class="notfound__code">404</h1>
    <p class="notfound__message">Oops! Page not found</p>
    <p class="notfound__sub">
      The page you are looking for does not exist or has been moved.
    </p>
    <RouterLink to="/" class="notfound__btn">Back to Home</RouterLink>
  </div>
</template>

<script setup>
</script>

<style>
.notfound{
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #eed5fb, #d5a8f2, #f18585);
  text-align: center;
  padding: 2rem;
  color: #fff;
}

.notfound__code{
  font-size: clamp(5rem, 15vw, 12rem);
  font-weight: 900;
  margin: 0;
  background: linear-gradient(90deg, #f18585, #c174f2, #cb90f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
}

.notfound__message{
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 1rem;
}

.notfound__sub{
  margin: 0.75rem 0 2rem;
  font-size: 1rem;
  color: rgba(255,255,255,0.9);
  max-width: 500px;
}

.notfound__btn{
  background: #c174f2;
  color: #fff;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  transition: background 0.2s, transform 0.2s;
}

.notfound__btn:hover{
  background: #cb90f1;
  transform: translateY(-3px);
}
</style>
