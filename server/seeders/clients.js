const { Client } = require('../models');

const seedClients = async () => {
  const clientsData = [
  {
    surname: 'Иванов',
    name: 'Иван',
    patronymic: 'Иванович',
    phone: '+79123456789',
    email: 'ivanov1@example.com',
    passportSeries: '1234',
    passportNumber: '567890',
    passportIssuer: 'ОВД района Теплый Стан г. Москвы',
    passportIssueDate: '2020-01-15'
  },
  {
    surname: 'Лебедева',
    name: 'Екатерина',
    patronymic: 'Николаевна',
    phone: '+79123456789',
    email: 'lebedeva1@example.com',
    passportSeries: '4567',
    passportNumber: '012345',
    passportIssuer: 'УМВД России по Забайкальскому краю',
    passportIssueDate: '2022-04-11'
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
  },
  {
    surname: 'Смирнов',
    name: 'Алексей',
    patronymic: 'Петрович',
    phone: '+79234567890',
    email: 'smirnov@example.com',
    passportSeries: '5678',
    passportNumber: '123456',
    passportIssuer: 'УМВД России по Приморскому краю',
    passportIssueDate: '2018-07-12'
  },
  {
    surname: 'Кузнецова',
    name: 'Елена',
    patronymic: 'Александровна',
    phone: '+79345678901',
    email: 'kuznetsova@example.com',
    passportSeries: '6789',
    passportNumber: '234567',
    passportIssuer: 'УМВД России по Хабаровскому краю',
    passportIssueDate: '2021-03-25'
  },
  {
    surname: 'Попов',
    name: 'Дмитрий',
    patronymic: 'Сергеевич',
    phone: '+79456789012',
    email: 'popov@example.com',
    passportSeries: '7890',
    passportNumber: '345678',
    passportIssuer: 'УМВД России по Амурской области',
    passportIssueDate: '2017-11-08'
  },
  {
    surname: 'Соколова',
    name: 'Анна',
    patronymic: 'Владимировна',
    phone: '+79567890123',
    email: 'sokolova@example.com',
    passportSeries: '8901',
    passportNumber: '456789',
    passportIssuer: 'УМВД России по Камчатскому краю',
    passportIssueDate: '2022-01-30'
  },
  {
    surname: 'Михайлов',
    name: 'Сергей',
    patronymic: 'Андреевич',
    phone: '+79678901234',
    email: 'mikhailov@example.com',
    passportSeries: '9012',
    passportNumber: '567890',
    passportIssuer: 'УМВД России по Сахалинской области',
    passportIssueDate: '2019-09-14'
  },
  {
    surname: 'Федорова',
    name: 'Ольга',
    patronymic: 'Игоревна',
    phone: '+79789012345',
    email: 'fedorova@example.com',
    passportSeries: '0123',
    passportNumber: '678901',
    passportIssuer: 'УМВД России по Магаданской области',
    passportIssueDate: '2020-06-22'
  },
  {
    surname: 'Морозов',
    name: 'Николай',
    patronymic: 'Дмитриевич',
    phone: '+79890123456',
    email: 'morozov@example.com',
    passportSeries: '1234',
    passportNumber: '789012',
    passportIssuer: 'УМВД России по Еврейской автономной области',
    passportIssueDate: '2018-04-17'
  },
  {
    surname: 'Волкова',
    name: 'Татьяна',
    patronymic: 'Михайловна',
    phone: '+79901234567',
    email: 'volkova@example.com',
    passportSeries: '2345',
    passportNumber: '890123',
    passportIssuer: 'УМВД России по Чукотскому автономному округу',
    passportIssueDate: '2021-08-05'
  },
  {
    surname: 'Алексеев',
    name: 'Владимир',
    patronymic: 'Александрович',
    phone: '+79012345678',
    email: 'alekseev@example.com',
    passportSeries: '3456',
    passportNumber: '901234',
    passportIssuer: 'УМВД России по Республике Саха (Якутия)',
    passportIssueDate: '2017-02-28'
  },
  {
    surname: 'Лебедева',
    name: 'Екатерина',
    patronymic: 'Николаевна',
    phone: '+79123456789',
    email: 'lebedeva2@example.com',
    passportSeries: '4567',
    passportNumber: '012345',
    passportIssuer: 'УМВД России по Забайкальскому краю',
    passportIssueDate: '2022-04-11'
  },
  {
    surname: 'Семенов',
    name: 'Артем',
    patronymic: 'Валерьевич',
    phone: '+79234567890',
    email: 'semenov@example.com',
    passportSeries: '5678',
    passportNumber: '123456',
    passportIssuer: 'УМВД России по Иркутской области',
    passportIssueDate: '2019-12-03'
  },
  {
    surname: 'Егорова',
    name: 'Наталья',
    patronymic: 'Андреевна',
    phone: '+79345678901',
    email: 'egorova@example.com',
    passportSeries: '6789',
    passportNumber: '234567',
    passportIssuer: 'УМВД России по Республике Бурятия',
    passportIssueDate: '2020-10-19'
  },
  {
    surname: 'Павлов',
    name: 'Игорь',
    patronymic: 'Сергеевич',
    phone: '+79456789012',
    email: 'pavlov@example.com',
    passportSeries: '7890',
    passportNumber: '345678',
    passportIssuer: 'УМВД России по Красноярскому краю',
    passportIssueDate: '2018-08-27'
  },
  {
    surname: 'Козлова',
    name: 'Светлана',
    patronymic: 'Дмитриевна',
    phone: '+79567890123',
    email: 'kozlova@example.com',
    passportSeries: '8901',
    passportNumber: '456789',
    passportIssuer: 'УМВД России по Кемеровской области',
    passportIssueDate: '2021-05-14'
  },
  {
    surname: 'Степанов',
    name: 'Максим',
    patronymic: 'Владимирович',
    phone: '+79678901234',
    email: 'stepanov@example.com',
    passportSeries: '9012',
    passportNumber: '567890',
    passportIssuer: 'УМВД России по Новосибирской области',
    passportIssueDate: '2017-07-09'
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

  for (const clientData of clientsData) {
    const existingClient = await Client.findOne({ where: { email: clientData.email } });
    if (existingClient) {
      console.log(`Клиент с email ${clientData.email} уже существует`);
      continue;
    }
    await Client.create(clientData);
  }
};

module.exports = seedClients;