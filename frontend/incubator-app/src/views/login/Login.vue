<template>
    <form name="login-form">
      <div class="mb-3">
        <label for="username">Username: </label>
        <input type="text" id="username" v-model="input.username" />
      </div>
      <div class="mb-3">
        <label for="password">Password: </label>
        <input type="password" id="password" v-model="input.password" />
      </div>
      <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="login()">
        Login
      </button>
    </form>
    <h3>{{ this.output }}</h3> 
</template>
  
<script>
import accounts from "../../example/account.json"

export default {
    name: 'Login',
    data() {
      return {
        input: {
          username: "",
          password: ""
        },
        output: "",
      }
    },
    methods: {
      login() {
        if (this.input.username != "" || this.input.password != "") {
            const account = accounts.find(s => s.user === this.input.username);
            if (account === undefined) {
                this.output = "Username not found";
                return
            }
            this.username = account.user;
            this.password = account.password;
            if (this.password != this.input.password) {
                this.output = "Error in the password"
            } else {
                this.output = "Authentication complete";
                this.$router.push("/");
            }
        } else {
            this.output = "Username and password can not be empty"
        }
      },
    },
  }
  </script>