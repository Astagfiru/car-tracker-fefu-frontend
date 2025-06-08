const { Employee } = require('../models');

const employeesData = [
  {
    last_name: 'Смирнов',
    first_name: 'Алексей',
    middle_name: 'Иванович',
    email: 'smirnov@cartracker.ru',
    phone: '+79991234567',
    position: 'Администратор',
  },
  {
    last_name: 'Козлова',
    first_name: 'Елена',
    middle_name: 'Сергеевна',
    email: 'kozlova@cartracker.ru',
    phone: '+79991234568',
    position: 'Бухгалтер',
  },
  {
    last_name: 'Новиков',
    first_name: 'Дмитрий',
    middle_name: 'Александрович',
    email: 'novikov@cartracker.ru',
    phone: '+79991234569',
    position: 'Менеджер по продажам',
  },
];

module.exports = async function seedEmployees() {
  const count = await Employee.count();
  if (count > 0) {
    console.log('Employees already seeded, skipping.');
    return;
  }

  await Employee.bulkCreate(employeesData);
  console.log('Employees seeded successfully');
};