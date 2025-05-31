<template>
  <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <button @click="refreshMap" class="refresh-btn">Refresh Map</button>
    <div id="map" style="height: 500px; width: 800px;"></div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icon issue with bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default {
  name: 'ChargerMap',
  data() {
    return {
      chargers: [],
      map: null,
      markers: []
    };
  },
  async mounted() {
    await this.fetchChargers();
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    async fetchChargers() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://charger-dd82.vercel.app/api/charging-stations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.chargers = res.data;
      } catch (err) {
        this.chargers = [];
      }
    },
    async refreshMap() {
      await this.fetchChargers();
      this.addMarkers();
    },
    initMap() {
      if (this.map) {
        this.map.remove();
        this.map = null;
      }
      const defaultCenter = this.chargers.length
        ? [this.chargers[0].location.latitude, this.chargers[0].location.longitude]
        : [22.9734, 78.6569]; // Center of India
      this.map = L.map('map').setView(defaultCenter, 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
      this.addMarkers();
    },
    addMarkers() {
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];
      this.chargers.forEach(charger => {
        const marker = L.marker([charger.location.latitude, charger.location.longitude]).addTo(this.map);
        marker.bindPopup(`
          <strong>${charger.name}</strong><br />
          Status: ${charger.status}<br />
          Power: ${charger.powerOutput} kW<br />
          Connector: ${charger.connectorType}<br />
          Location: (${charger.location.latitude}, ${charger.location.longitude})
        `);
        this.markers.push(marker);
      });
    }
  },
  watch: {
    chargers: {
      handler() {
        if (this.map) {
          this.addMarkers();
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.charger-map-bg {
  min-height: 100vh;
  background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 1s cubic-bezier(0.4, 0, 0.2, 1);
}
.charger-map-container {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border-radius: 24px;
  padding: 32px 32px 24px 32px;
  max-width: 900px;
  width: 95vw;
  margin: 40px auto;
  animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: box-shadow 0.3s;
}
.charger-map-container h2 {
  color: #1a237e;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: 1px;
  text-align: center;
}
.map-area {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.15);
  margin-bottom: 16px;
  transition: box-shadow 0.3s;
}
.error {
  color: #d32f2f;
  margin-top: 10px;
  text-align: center;
  font-weight: 600;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Popup styles */
.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.7s;
}
.popup-img {
  width: 100%;
  max-width: 220px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.12);
}
.popup-details {
  text-align: center;
  color: #222;
  font-size: 1rem;
}
.status {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.95em;
  font-weight: 600;
  margin: 4px 0;
}
.status.active {
  background: #c8e6c9;
  color: #388e3c;
}
.status.inactive {
  background: #ffcdd2;
  color: #d32f2f;
}
.refresh-btn {
  background: #3949ab;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background 0.2s;
}
.refresh-btn:hover {
  background: #1a237e;
}
</style> 