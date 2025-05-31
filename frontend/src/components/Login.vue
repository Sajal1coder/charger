<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="login-email">Email:</label>
          <input id="login-email" v-model="email" type="email" required placeholder="you@email.com" />
        </div>
        <div class="form-group">
          <label for="login-password">Password:</label>
          <input id="login-password" v-model="password" type="password" required placeholder="Password" />
        </div>
        <button type="submit" class="submit-btn">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
      <router-link to="/register" class="register-link">Don't have an account? Register</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      try {
        const res = await axios.post('https://charger-dd82.vercel.app/api/auth/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', res.data.token);
        this.$emit('login-success');
        this.$router.push('/chargers');
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #4a148c, #880e4f);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-container h2 {
  color: #4a148c;
  font-weight: 700;
  margin-bottom: 28px;
  letter-spacing: 1px;
  text-align: center;
}
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form-group {
  width: 100%;
  margin-bottom: 0;
}
.form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}
.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7f7f7;
  box-sizing: border-box; /* Include padding and border in element's total width */
  transition: border-color 0.2s ease-in-out;
}
.form-group input:focus {
  border-color: #4a148c;
  outline: none;
  box-shadow: 0 0 5px rgba(74, 20, 140, 0.3);
}
.submit-btn {
  background: linear-gradient(90deg, #4a148c 0%, #880e4f 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  transition: background 0.3s ease-in-out;
  width: 100%;
}
.submit-btn:hover {
  background: linear-gradient(90deg, #880e4f 0%, #4a148c 100%);
}
.error {
  color: #d32f2f;
  margin-top: 15px;
  text-align: center;
  font-weight: 600;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.register-link {
  margin-top: 20px;
  color: #4a148c;
  text-decoration: none;
  font-size: 1rem;
  text-align: center;
  display: block;
  transition: color 0.2s ease-in-out;
}
.register-link:hover {
  color: #880e4f;
  text-decoration: underline;
}
</style> 