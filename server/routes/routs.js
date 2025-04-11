const express = require('express');
const router = express.Router();
const models = require('../models');
const Client = models.Client;

// Базовый маршрут /api/
router.get('/', (req, res) => {
  res.send('Welcome to the Car Tracker API from routes!');
});

// Получить всех клиентов
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать нового клиента
router.post('/clients', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const client = await Client.create({ name, email, phone });
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;