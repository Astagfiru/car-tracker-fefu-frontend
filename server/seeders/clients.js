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
  },
  {
    surname: 'Сидоров',
    name: 'Алексей',
    patronymic: 'Петрович',
    phone: '+79261112233',
    email: 'sidorov@mail.ru',
    passportSeries: '5678',
    passportNumber: '123456',
    passportIssuer: 'ОУФМС по г. Екатеринбургу',
    passportIssueDate: '2021-03-10'
  },
  {
    surname: 'Смирнова',
    name: 'Елена',
    patronymic: 'Викторовна',
    phone: '89035556677',
    email: 'smirnova.elena@yandex.ru',
    passportSeries: '7890',
    passportNumber: '654321',
    passportIssuer: 'МВД по Республике Татарстан',
    passportIssueDate: '2018-12-01'
  },
  {
    surname: 'Кузнецов',
    name: 'Дмитрий',
    patronymic: 'Александрович',
    phone: '+79659998877',
    email: 'kuznetsov_d@gmail.com',
    passportSeries: '9012',
    passportNumber: '789012',
    passportIssuer: 'ОТД УФМС по Ростовской области',
    passportIssueDate: '2022-07-05'
  },
  {
    surname: 'Васильева',
    name: 'Ольга',
    patronymic: 'Ивановна',
    phone: '89852223344',
    email: 'vasilyeva.olga@outlook.com',
    passportSeries: '0123',
    passportNumber: '890123',
    passportIssuer: 'УВД по Краснодарскому краю',
    passportIssueDate: '2017-09-18'
  },
  {
    surname: 'Морозов',
    name: 'Сергей',
    patronymic: 'Дмитриевич',
    phone: '+79167778899',
    email: 'morozov.s@rambler.ru',
    passportSeries: '2345',
    passportNumber: '901234',
    passportIssuer: 'ОУФМС по Самарской области',
    passportIssueDate: '2023-02-28'
  },
  {
    surname: 'Волкова',
    name: 'Анастасия',
    patronymic: 'Алексеевна',
    phone: '89094445566',
    email: 'volkova.a@mail.ru',
    passportSeries: '3456',
    passportNumber: '012345',
    passportIssuer: 'ГУ МВД по Воронежской области',
    passportIssueDate: '2016-06-12'
  },
  {
    surname: 'Лебедев',
    name: 'Максим',
    patronymic: 'Сергеевич',
    phone: '+79058889900',
    email: 'lebedev.m@yandex.ru',
    passportSeries: '4567',
    passportNumber: '123456',
    passportIssuer: 'УФМС по Новосибирской области',
    passportIssueDate: '2024-04-01'
  },
  {
    surname: 'Соколова',
    name: 'Татьяна',
    patronymic: 'Владимировна',
    phone: '89251112233',
    email: 'sokolova.t@gmail.com',
    passportSeries: '5678',
    passportNumber: '234567',
    passportIssuer: 'ОТД УФМС по Пермскому краю',
    passportIssueDate: '2015-11-20'
  },
  {
    surname: 'Андреев',
    name: 'Роман',
    patronymic: 'Игоревич',
    phone: '+79153334455',
    email: 'andreev.r@outlook.com',
    passportSeries: '6789',
    passportNumber: '345678',
    passportIssuer: 'УВД по Алтайскому краю',
    passportIssueDate: '2019-08-08'
  },
  {
    surname: 'Козлова',
    name: 'Наталья',
    patronymic: 'Дмитриевна',
    phone: '89604445566',
    email: 'kozlova.n@rambler.ru',
    passportSeries: '7890',
    passportNumber: '456789',
    passportIssuer: 'ОУФМС по Тюменской области',
    passportIssueDate: '2020-05-03'
  },
  {
    surname: 'Николаев',
    name: 'Кирилл',
    patronymic: 'Андреевич',
    phone: '+79065556677',
    email: 'nikolaev.k@mail.ru',
    passportSeries: '8901',
    passportNumber: '567890',
    passportIssuer: 'ГУ МВД по Республике Башкортостан',
    passportIssueDate: '2018-01-25'
  },
  {
    surname: 'Егорова',
    name: 'Светлана',
    patronymic: 'Михайловна',
    phone: '89192223344',
    email: 'egorova.s@yandex.ru',
    passportSeries: '9012',
    passportNumber: '678901',
    passportIssuer: 'УФМС по Калининградской области',
    passportIssueDate: '2021-10-14'
  },
  {
    surname: 'Зайцев',
    name: 'Павел',
    patronymic: 'Александрович',
    phone: '+79857778899',
    email: 'zaitsev.p@gmail.com',
    passportSeries: '0123',
    passportNumber: '789012',
    passportIssuer: 'ОТД УФМС по Хабаровскому краю',
    passportIssueDate: '2022-09-07'
  },
  {
    surname: 'Федорова',
    name: 'Виктория',
    patronymic: 'Сергеевна',
    phone: '89506667788',
    email: 'fedorova.v@outlook.com',
    passportSeries: '1234',
    passportNumber: '890123',
    passportIssuer: 'УВД по Иркутской области',
    passportIssueDate: '2017-04-19'
  },
  {
    surname: 'Макаров',
    name: 'Игорь',
    patronymic: 'Дмитриевич',
    phone: '+79298889900',
    email: 'makarov.i@rambler.ru',
    passportSeries: '4567',
    passportNumber: '212345',
    passportIssuer: 'ОУФМС по Курской области',
    passportIssueDate: '2023-06-01'
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