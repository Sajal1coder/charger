<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="register-name">Name:</label>
          <input id="register-name" v-model="name" type="text" required placeholder="Your Name" />
        </div>
        <div class="form-group">
          <label for="register-email">Email:</label>
          <input id="register-email" v-model="email" type="email" required placeholder="you@email.com" />
        </div>
        <div class="form-group">
          <label for="register-password">Password:</label>
          <input id="register-password" v-model="password" type="password" required placeholder="Password" />
        </div>
        <button type="submit" class="submit-btn">Register</button>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
      </form>
      <router-link to="/login" class="login-link">Already have an account? Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
      success: ''
    };
  },
  methods: {
    async handleRegister() {
      this.error = '';
      this.success = '';
      try {
        await axios.post('https://charger-dd82.vercel.app/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        this.success = 'Registration successful! You can now login.';
        this.name = '';
        this.email = '';
        this.password = '';
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed';
      }
    }
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #2e7d32, #388e3c);
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-container {
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border-radius: 24px;
  padding: 30px;
  max-width: 400px;
  width: 95vw;
  margin: 40px auto;
  animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register-container h2 {
  color: #1b5e20;
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
  box-sizing: border-box;
  transition: border 0.2s;
}
.form-group input:focus {
  border: 1.5px solid #2e7d32;
  outline: none;
  box-shadow: 0 0 5px rgba(46, 125, 50, 0.3);
}
.submit-btn {
  background: linear-gradient(90deg, #2e7d32 0%, #388e3c 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  transition: background 0.2s;
  width: 100%;
}
.submit-btn:hover {
  background: linear-gradient(90deg, #388e3c 0%, #2e7d32 100%);
}
.error {
  color: #d32f2f;
  margin-top: 15px;
  text-align: center;
  font-weight: 600;
}
.success {
  color: #388e3c;
  margin-top: 15px;
  text-align: center;
  font-weight: 600;
}
.login-link {
  margin-top: 20px;
  color: #2e7d32;
  text-decoration: none;
  font-size: 1rem;
  text-align: center;
  display: block;
  transition: color 0.2s ease-in-out;
}
.login-link:hover {
  color: #1b5e20;
  text-decoration: underline;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 