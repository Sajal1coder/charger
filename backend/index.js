    // backend/index.js
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const dotenv = require('dotenv');

    dotenv.config();

    const app = express();
    app.use(cors({
      origin: '*'
    }));
    app.use(express.json());

    const PORT = process.env.PORT || 5000; // PORT might be ignored by Vercel
    const MONGO_URI = process.env.MONGO_URI; // Use environment variable

    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.error('MongoDB connection error:', err));

    app.get('/', (req, res) => {
      res.send('API is running');
    });

    // Import routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/charging-stations', require('./routes/chargingStation'));

    // Important: Vercel needs the app instance to be exported
    module.exports = app;

    // Optional: Listen locally only if not on Vercel
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }