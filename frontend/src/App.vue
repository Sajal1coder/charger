<template>
  <div id="app">
    <nav>
      <template v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </template>
      <template v-else>
        <router-link to="/chargers">Chargers</router-link> |
        <router-link to="/map">Map View</router-link> |
        <a href="#" @click.prevent="logout">Logout</a>
      </template>
    </nav>
    <router-view @login-success="onLoginSuccess" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('token');
    },
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
    onLoginSuccess() {
      this.isLoggedIn = true;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
}
nav {
  background: #333;
  padding: 12px 24px;
  margin-bottom: 24px;
}
nav a {
  color: #fff;
  margin-right: 12px;
  text-decoration: none;
}
nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
