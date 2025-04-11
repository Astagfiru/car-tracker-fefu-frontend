const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Car Tracker API from routes!');
});

module.exports = router;