/**
 * @module seeders/index
 * @description Главный файл для запуска всех сидеров
 */

const seedClients = require('./clients');
const seedEmployees = require('./employees');
const seedCarModels = require('./car_models');
const seedCars = require('./cars');
const seedRequests = require('./requests');
const seedContracts = require('./contracts');

/**
 * Запускает все сидеры в правильном порядке с учетом зависимостей
 */
const runSeeders = async () => {
  try {
    console.log('Начало заполнения базы данных тестовыми данными...');
    
    // Сначала заполняем независимые таблицы
    await seedClients();
    await seedEmployees();
    await seedCarModels();
    
    // Затем таблицы с зависимостями
    await seedCars(); // Зависит от car_models
    await seedRequests(); // Зависит от clients, employees и cars
    await seedContracts(); // Зависит от requests
    
    console.log('База данных успешно заполнена тестовыми данными!');
  } catch (err) {
    console.error('Ошибка при заполнении базы данных:', err);
  }
};

// Если файл запущен напрямую (не импортирован)
if (require.main === module) {
  runSeeders();
}

module.exports = runSeeders;