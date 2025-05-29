/**
 * @module seeders/seedEmployees
 * @description Инициализация таблицы employees
 */

const { Employee } = require('../models');

const employeesData = [
  {
    last_name: 'Смирнов',
    first_name: 'Алексей',
    middle_name: 'Петрович',
    phone: '+79001234567',
    email: 'smirnov@cartracker.ru',
    position: 'Менеджер по продажам'
  },
  {
    last_name: 'Козлова',
    first_name: 'Екатерина',
    middle_name: 'Александровна',
    phone: '+79009876543',
    email: 'kozlova@cartracker.ru',
    position: 'Старший менеджер'
  },
  {
    last_name: 'Новиков',
    first_name: 'Дмитрий',
    middle_name: 'Сергеевич',
    phone: '+79005554433',
    email: 'novikov@cartracker.ru',
    position: 'Консультант'
  }
];

module.exports = async function seedEmployees() {
  const count = await Employee.count();
  if (count > 0) return;

  await Employee.bulkCreate(employeesData);
  console.log('Employees seeded successfully');
};
