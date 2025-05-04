const { Employee } = require('../models');

const employeesData = [
  {
    surname: 'Смирнов',
    name: 'Алексей',
    patronymic: 'Петрович',
    phone: '+79001234567',
    email: 'smirnov@cartracker.ru',
    position: 'Менеджер по продажам'
  },
  {
    surname: 'Козлова',
    name: 'Екатерина',
    patronymic: 'Александровна',
    phone: '+79009876543',
    email: 'kozlova@cartracker.ru',
    position: 'Старший менеджер'
  },
  {
    surname: 'Новиков',
    name: 'Дмитрий',
    patronymic: 'Сергеевич',
    phone: '+79005554433',
    email: 'novikov@cartracker.ru',
    position: 'Консультант'
  }
];

const seedEmployees = async () => {
  try {
    await Employee.bulkCreate(employeesData);
    console.log('Employees seeded successfully');
  } catch (err) {
    console.error('Error seeding employees:', err);
  }
};

module.exports = seedEmployees;