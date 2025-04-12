const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Явно указываем путь к .env
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Отладочный вывод переменных
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Подключаем Sequelize
const sequelize = require('./config/db');

// Подключаем все модели
const models = require('./models');

// Проверяем подключение к базе данных
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    // Синхронизируем модели с базой данных
    return sequelize.sync({ force: true }); // Временно оставляем force: true
  })
  .then(() => {
    console.log('Database synced');
    // Выводим список таблиц, которые Sequelize знает
    console.log('Registered models:', Object.keys(sequelize.models));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json());

app.use('/static', express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

const routes = require('./routes/routs');
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});