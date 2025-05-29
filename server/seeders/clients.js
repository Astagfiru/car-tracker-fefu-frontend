const { Client } = require('../models');

const clientsData = [
  {
    last_name: 'Иванов',
    first_name: 'Иван',
    middle_name: 'Иванович',
    phone: '+79123456789',
    email: 'ivanov1@example.com',
    passport_series: '1234',
    passport_number: '567890',
    issued_by: 'ОВД района Теплый Стан г. Москвы',
    issue_date: '2020-01-15'
  },
  {
    last_name: 'Лебедева',
    first_name: 'Екатерина',
    middle_name: 'Николаевна',
    phone: '+79123456788',
    email: 'lebedeva1@example.com',
    passport_series: '4567',
    passport_number: '012345',
    issued_by: 'УМВД России по Забайкальскому краю',
    issue_date: '2022-04-11'
  },
  {
    last_name: 'Петрова',
    first_name: 'Мария',
    middle_name: 'Сергеевна',
    phone: '89123456780',
    email: 'petrova@example.com',
    passport_series: '4321',
    passport_number: '098765',
    issued_by: 'УФМС России по г. Санкт-Петербургу',
    issue_date: '2019-05-20'
  },
  {
    last_name: 'Смирнов',
    first_name: 'Алексей',
    middle_name: 'Петрович',
    phone: '+79234567890',
    email: 'smirnov@example.com',
    passport_series: '5678',
    passport_number: '123456',
    issued_by: 'УМВД России по Приморскому краю',
    issue_date: '2018-07-12'
  },
  {
    last_name: 'Кузнецова',
    first_name: 'Елена',
    middle_name: 'Александровна',
    phone: '+79345678901',
    email: 'kuznetsova@example.com',
    passport_series: '6789',
    passport_number: '234567',
    issued_by: 'УМВД России по Хабаровскому краю',
    issue_date: '2021-03-25'
  },
  {
    last_name: 'Попов',
    first_name: 'Дмитрий',
    middle_name: 'Сергеевич',
    phone: '+79456789012',
    email: 'popov@example.com',
    passport_series: '7890',
    passport_number: '345678',
    issued_by: 'УМВД России по Амурской области',
    issue_date: '2017-11-08'
  },
  {
    last_name: 'Соколова',
    first_name: 'Анна',
    middle_name: 'Владимировна',
    phone: '+79567890123',
    email: 'sokolova@example.com',
    passport_series: '8901',
    passport_number: '456789',
    issued_by: 'УМВД России по Камчатскому краю',
    issue_date: '2022-01-30'
  },
  {
    last_name: 'Михайлов',
    first_name: 'Сергей',
    middle_name: 'Андреевич',
    phone: '+79678901234',
    email: 'mikhailov@example.com',
    passport_series: '9012',
    passport_number: '567890',
    issued_by: 'УМВД России по Сахалинской области',
    issue_date: '2019-09-14'
  },
  {
    last_name: 'Федорова',
    first_name: 'Ольга',
    middle_name: 'Игоревна',
    phone: '+79789012345',
    email: 'fedorova@example.com',
    passport_series: '0123',
    passport_number: '678901',
    issued_by: 'УМВД России по Магаданской области',
    issue_date: '2020-06-22'
  },
  {
    last_name: 'Морозов',
    first_name: 'Николай',
    middle_name: 'Дмитриевич',
    phone: '+79890123456',
    email: 'morozov@example.com',
    passport_series: '1234',
    passport_number: '789012',
    issued_by: 'УМВД России по Еврейской автономной области',
    issue_date: '2018-04-17'
  },
  {
    last_name: 'Волкова',
    first_name: 'Татьяна',
    middle_name: 'Михайловна',
    phone: '+79901234567',
    email: 'volkova@example.com',
    passport_series: '2345',
    passport_number: '890123',
    issued_by: 'УМВД России по Чукотскому автономному округу',
    issue_date: '2021-08-05'
  },
  {
    last_name: 'Алексеев',
    first_name: 'Владимир',
    middle_name: 'Александрович',
    phone: '+79012345678',
    email: 'alekseev@example.com',
    passport_series: '3456',
    passport_number: '901234',
    issued_by: 'УМВД России по Республике Саха (Якутия)',
    issue_date: '2017-02-28'
  },
  {
    last_name: 'Лебедева',
    first_name: 'Екатерина',
    middle_name: 'Николаевна',
    phone: '+79123456787',
    email: 'lebedeva2@example.com',
    passport_series: '4567',
    passport_number: '012345',
    issued_by: 'УМВД России по Забайкальскому краю',
    issue_date: '2022-04-11'
  },
  {
    last_name: 'Семенов',
    first_name: 'Артем',
    middle_name: 'Валерьевич',
    phone: '+79234567890',
    email: 'semenov@example.com',
    passport_series: '5678',
    passport_number: '123456',
    issued_by: 'УМВД России по Иркутской области',
    issue_date: '2019-12-03'
  },
  {
    last_name: 'Егорова',
    first_name: 'Наталья',
    middle_name: 'Андреевна',
    phone: '+79345678901',
    email: 'egorova@example.com',
    passport_series: '6789',
    passport_number: '234567',
    issued_by: 'УМВД России по Республике Бурятия',
    issue_date: '2020-10-19'
  },
  {
    last_name: 'Павлов',
    first_name: 'Игорь',
    middle_name: 'Сергеевич',
    phone: '+79456789012',
    email: 'pavlov@example.com',
    passport_series: '7890',
    passport_number: '345678',
    issued_by: 'УМВД России по Красноярскому краю',
    issue_date: '2018-08-27'
  },
  {
    last_name: 'Козлова',
    first_name: 'Светлана',
    middle_name: 'Дмитриевна',
    phone: '+79567890123',
    email: 'kozlova@example.com',
    passport_series: '8901',
    passport_number: '456789',
    issued_by: 'УМВД России по Кемеровской области',
    issue_date: '2021-05-14'
  },
  {
    last_name: 'Степанов',
    first_name: 'Максим',
    middle_name: 'Владимирович',
    phone: '+79678901234',
    email: 'stepanov@example.com',
    passport_series: '9012',
    passport_number: '567890',
    issued_by: 'УМВД России по Новосибирской области',
    issue_date: '2017-07-09'
  }
];

module.exports = async function seedClients() {
  if (await Client.count() > 0) return;

  await Client.bulkCreate(clientsData);
  console.log('Clients seeded successfully');
};