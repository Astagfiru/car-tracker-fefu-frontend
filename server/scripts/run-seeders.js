/**
 * @module scripts/run-seeders
 * @description Скрипт для запуска всех сидеров
 */

const runSeeders = require('../seeders/index');

console.log('Запуск скрипта заполнения базы данных...');

runSeeders()
  .then(() => {
    console.log('Скрипт успешно выполнен!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Ошибка при выполнении скрипта:', err);
    process.exit(1);
  });