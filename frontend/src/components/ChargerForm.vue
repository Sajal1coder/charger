<template>
  <div class="charger-form-page">
    <div class="charger-form-container">
      <h3>{{ isEdit ? 'Edit' : 'Add' }} Charging Station</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="station-name">Name:</label>
          <input id="station-name" v-model="form.name" type="text" required placeholder="Station Name" />
        </div>
        <div class="form-group">
          <label for="station-status">Status:</label>
          <select id="station-status" v-model="form.status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div class="form-group">
          <label for="station-power">Power Output (kW):</label>
          <input id="station-power" v-model.number="form.powerOutput" type="number" required placeholder="e.g. 50" />
        </div>
        <div class="form-group">
          <label for="station-connector">Connector Type:</label>
          <input id="station-connector" v-model="form.connectorType" type="text" required placeholder="e.g. Type 2" />
        </div>
        <div class="form-group">
          <label for="station-latitude">Latitude:</label>
          <input id="station-latitude" v-model.number="form.location.latitude" type="number" step="any" required placeholder="e.g. 28.6" />
        </div>
        <div class="form-group">
          <label for="station-longitude">Longitude:</label>
          <input id="station-longitude" v-model.number="form.location.longitude" type="number" step="any" required placeholder="e.g. 77.2" />
        </div>
        <button type="submit" class="submit-btn">{{ isEdit ? 'Update' : 'Add' }}</button>
        <button v-if="isEdit" type="button" @click="$emit('cancel')" class="cancel-btn">Cancel</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChargerForm',
  props: {
    charger: Object,
    isEdit: Boolean
  },
  data() {
    return {
      form: {
        name: '',
        status: 'Active',
        powerOutput: 0,
        connectorType: '',
        location: { latitude: 0, longitude: 0 }
      },
      error: ''
    };
  },
  watch: {
    charger: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = JSON.parse(JSON.stringify(newVal));
        } else {
           // Reset form when adding a new charger
          this.form = {
            name: '',
            status: 'Active',
            powerOutput: 0,
            connectorType: '',
            location: { latitude: 0, longitude: 0 }
          };
        }
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.error = '';
      const token = localStorage.getItem('token');
      try {
        if (this.isEdit) {
          await axios.put(`http://localhost:5000/api/charging-stations/${this.charger._id}`,
            this.form,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          await axios.post('http://localhost:5000/api/charging-stations',
            this.form,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
        this.$emit('success');
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to save charging station';
      }
    }
  }
};
</script>

<style scoped>
.charger-form-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #2e7d32, #388e3c);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.charger-form-container {
  max-width: 500px;
  margin: 24px auto;
  padding: 30px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.charger-form-container h3 {
  color: #1a237e;
  text-align: center;
  margin-bottom: 24px;
}
.form-group {
  width: 100%;
  margin-bottom: 16px;
}
.form-group label {
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 6px;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7f7f7;
  box-sizing: border-box;
  transition: border 0.2s;
}
.form-group input:focus, .form-group select:focus {
  border: 1.5px solid #2e7d32;
  outline: none;
  box-shadow: 0 0 5px rgba(46, 125, 50, 0.3);
}
.submit-btn, .cancel-btn {
  background: linear-gradient(90deg, #1a237e 0%, #3949ab 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  width: 100%;
}
.submit-btn:hover, .cancel-btn:hover {
   background: linear-gradient(90deg, #3949ab 0%, #1a237e 100%);
}
.cancel-btn {
  background: #616161;
  margin-top: 10px;
}
.cancel-btn:hover {
  background: #424242;
}
.error {
  color: red;
  margin-top: 10px;
  text-align: center;
  font-weight: 600;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 