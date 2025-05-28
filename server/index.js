/**
 * @module index
 * @description Основной файл сервера Car Tracker
 */

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const sequelize = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const models = require("./models");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

const routes = require("./routes/routes");
app.use("/api", routes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');
    
    await sequelize.sync({ force: false });
    console.log('Database synced');
    console.log('Registered models:', Object.keys(sequelize.models));
    
    await require('./seeders/init-db')();
    console.log('All seeders completed');
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

// Обработчики необработанных исключений и отклонений промисов
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

startServer();
