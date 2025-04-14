const { Client } = require('../models');

const clientsData = [
  {
    surname: 'Иванов',
    name: 'Иван',
    patronymic: 'Иванович',
    phone: '+79123456789',
    email: 'ivanov@example.com',
    passportSeries: '1234',
    passportNumber: '567890',
    passportIssuer: 'ОВД района Теплый Стан г. Москвы',
    passportIssueDate: '2020-01-15'
  },
  {
    surname: 'Петрова',
    name: 'Мария',
    patronymic: 'Сергеевна',
    phone: '89123456780',
    email: 'petrova@example.com',
    passportSeries: '4321',
    passportNumber: '098765',
    passportIssuer: 'УФМС России по г. Санкт-Петербургу',
    passportIssueDate: '2019-05-20'
  }
];

const seedClients = async () => {
  try {
    await Client.bulkCreate(clientsData);
    console.log('Clients seeded successfully');
  } catch (err) {
    console.error('Error seeding clients:', err);
  }
};

module.exports = seedClients;