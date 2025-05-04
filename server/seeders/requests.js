const { Request } = require('../models');

const requestsData = [
  {
    client_id: 1, // Иванов Иван Иванович
    employee_id: 1, // Смирнов Алексей Петрович
    car_id: 1, // Toyota Camry
    date: '2023-10-15',
    status: 'ЗАВЕРШЕНА'
  },
  {
    client_id: 2, // Петрова Мария Сергеевна
    employee_id: 2, // Козлова Екатерина Александровна
    car_id: 3, // Volkswagen Tiguan
    date: '2023-11-20',
    status: 'В РАБОТЕ'
  },
  {
    client_id: 1, // Иванов Иван Иванович
    employee_id: 3, // Новиков Дмитрий Сергеевич
    car_id: 4, // Kia Rio
    date: '2023-12-05',
    status: 'НОВАЯ'
  }
];

const seedRequests = async () => {
  try {
    await Request.bulkCreate(requestsData);
    console.log('Requests seeded successfully');
  } catch (err) {
    console.error('Error seeding requests:', err);
  }
};

module.exports = seedRequests;