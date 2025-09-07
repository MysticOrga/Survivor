<template>
  <form class="login-form">
      <h2>Sign In</h2>
      <p>Enter your email adress to continue.</p>
    <div>
      <input type="radio" id="admin" value="admin" v-model="picked" />
      <label for="admin">Admin</label>

      <input type="radio" id="founders" value="founders" v-model="picked" />
      <label for="founders">Founders</label>

      <input type="radio" id="investors" value="investors" v-model="picked" />
      <label for="investors">Investors</label>
    </div>
    <div class="mb-3">
      <label for="username">Username: </label>
      <input type="text" id="username" v-model="input.username" />
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="input.password" />
    </div>
    <button
      class="btn btn-outline-dark"
      type="submit"
      v-on:click.prevent="login()"
    >
      Login
    </button>
  </form>
  <h3>{{ this.output }}</h3>
</template>

<script>
import accounts from "../../example/account.json";
import { ref } from "vue";

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
      output: "",
      role: "",
      picked: ref("admin"),
    };
  },
  methods: {
    login() {
      if (this.input.username != "" || this.input.password != "") {
        const account = accounts.find((s) => s.user === this.input.username);
        if (account === undefined) {
          this.output = "Username not found";
          return;
        }
        this.username = account.user;
        this.password = account.password;
        this.role = account.role;
        if (this.password != this.input.password) {
          this.output = "Error in the password";
        } else {
          if (this.role != this.picked) {
            this.output = "Wrong role";
            return;
          }
          this.output = "Authentication complete";
          this.$router.push("/");
        }
      } else {
        this.output = "Username and password can not be empty";
      }
    },
  },
};
</script>

<style>
.login-form {
  display: grid;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid #f8cacf;
  border-radius: 16px;
  padding-top: 10rem;
  padding-bottom: 10rem;
  padding-left: 8rem;
  padding-right: 8rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.login-form label {
  padding: 2px;
}

.login-form input {
  padding: 2px;
}

.login-form button {
  padding: 1.5px;
  border-radius: 16px;
  border-color: #fff;
  color: #fff;
  background-color: #d5a8f2;
}

.login-form h2 {
  color:#f8cacf;
  left: 50%;
  top: 50%;
  transform: translate(30%, 15%);
}

.login-form p {
  font-size: 15px;
}

</style>
