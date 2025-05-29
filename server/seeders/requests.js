/**
 * @module seeders/seedApplications
 * @description Простая инициализация таблицы applications
 */

const { Application } = require('../models');

const applicationsData = [
  {
    client_id: 1,
    employee_id: 1,
    car_id: 1,
    application_date: '2023-10-15',
    status: 'Выполнено'
  },
  {
    client_id: 2,
    employee_id: 2,
    car_id: 3,
    application_date: '2023-11-20',
    status: 'В обработке'
  },
  {
    client_id: 1,
    employee_id: 3,
    car_id: 4,
    application_date: '2023-12-05',
    status: 'В обработке'
  }
];

module.exports = async function seedApplications() {
  const count = await Application.count();
  if (count > 0) {
    console.log('Applications already exist, skipping seeding');
    return;
  }

  await Application.bulkCreate(applicationsData);
  console.log('Applications seeded successfully');
};
