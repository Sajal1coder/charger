<template>
  <div class="charger-list-page">
    <div class="charger-list-container">
      <h2>Charging Stations</h2>
      <button @click="showAddForm = true" class="add-btn">Add Charging Station</button>
      <ChargerForm v-if="showAddForm" @success="onFormSuccess" @cancel="showAddForm = false" />
      <ChargerForm v-if="editCharger" :charger="editCharger" :isEdit="true" @success="onFormSuccess" @cancel="editCharger = null" />

      <!-- Filters -->
      <div class="filters">
        <label>Status:
          <select v-model="filters.status">
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <label>Power Output (min):
          <input v-model.number="filters.powerMin" type="number" placeholder="Min kW" />
        </label>
        <label>Power Output (max):
          <input v-model.number="filters.powerMax" type="number" placeholder="Max kW" />
        </label>
        <label>Connector Type:
          <input v-model="filters.connectorType" placeholder="Type" />
        </label>
      </div>

      <div v-if="error" class="error">{{ error }}</div>
      <ul v-if="filteredChargers.length">
        <li v-for="charger in filteredChargers" :key="charger._id" class="charger-item">
          <strong>{{ charger.name }}</strong> - <span :class="['status', charger.status.toLowerCase()]">{{ charger.status }}</span><br />
          <span>⚡ {{ charger.powerOutput }} kW</span> | <span>🔌 {{ charger.connectorType }}</span><br />
          <span>📍 ({{ charger.location.latitude }}, {{ charger.location.longitude }})</span><br />
          <button @click="editCharger = charger" class="edit-btn">Edit</button>
          <button @click="deleteCharger(charger._id)" class="delete-btn">Delete</button>
        </li>
      </ul>
      <div v-else>No charging stations found.</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ChargerForm from './ChargerForm.vue';

export default {
  name: 'ChargerList',
  components: { ChargerForm },
  data() {
    return {
      chargers: [],
      error: '',
      showAddForm: false,
      editCharger: null,
      filters: {
        status: '',
        powerMin: '',
        powerMax: '',
        connectorType: ''
      }
    };
  },
  computed: {
    filteredChargers() {
      return this.chargers.filter(c => {
        const statusMatch = !this.filters.status || c.status === this.filters.status;
        const powerMinMatch = this.filters.powerMin === '' || c.powerOutput >= this.filters.powerMin;
        const powerMaxMatch = this.filters.powerMax === '' || c.powerOutput <= this.filters.powerMax;
        const connectorMatch = !this.filters.connectorType || c.connectorType.toLowerCase().includes(this.filters.connectorType.toLowerCase());
        return statusMatch && powerMinMatch && powerMaxMatch && connectorMatch;
      });
    }
  },
  methods: {
    async fetchChargers() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/charging-stations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.chargers = res.data;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch charging stations';
      }
    },
    async deleteCharger(id) {
      if (!confirm('Are you sure you want to delete this charging station?')) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/charging-stations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchChargers();
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to delete charging station';
      }
    },
    onFormSuccess() {
      this.showAddForm = false;
      this.editCharger = null;
      this.fetchChargers();
    }
  },
  mounted() {
    this.fetchChargers();
  }
};
</script>

<style scoped>
.charger-list-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #004d40, #00796b);
  padding: 24px;
}
.charger-list-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.charger-list-container h2 {
  color: #004d40;
  text-align: center;
  margin-bottom: 24px;
}
.add-btn {
  background: linear-gradient(90deg, #004d40 0%, #00796b 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background 0.2s;
}
.add-btn:hover {
  background: linear-gradient(90deg, #00796b 0%, #004d40 100%);
}
.filters {
  display: flex;
  gap: 16px;
  margin: 16px 0;
  flex-wrap: wrap;
  padding: 16px;
  background: #e0f2f7;
  border-radius: 8px;
}
.filters label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  color: #004d40;
}
.filters input, .filters select {
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #bdbdbd;
}
.error {
  color: #d32f2f;
  margin-top: 10px;
  text-align: center;
  font-weight: 600;
}
ul {
  list-style: none;
  padding: 0;
}
.charger-item {
  margin-bottom: 18px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease-in-out;
}
.charger-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.charger-item strong {
  color: #004d40;
}
.status {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.9em;
  font-weight: 600;
  margin: 0 5px;
}
.status.active {
  background: #c8e6c9;
  color: #388e3c;
}
.status.inactive {
  background: #ffcdd2;
  color: #d32f2f;
}
.edit-btn, .delete-btn {
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.9em;
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.2s;
}
.edit-btn:hover {
  background: #bdbdbd;
}
.delete-btn:hover {
  background: #ffcdd2;
  color: #d32f2f;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 