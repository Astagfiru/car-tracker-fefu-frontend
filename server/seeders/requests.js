const { Application } = require('../models');

const requestsData = [
  {
    client_id: 1, // Иванов Иван Иванович
    employee_id: 1, // Смирнов Алексей Петрович
    car_id: 1, // Toyota Camry
    application_date: '2023-10-15',
    status: 'completed'
  },
  {
    client_id: 2, // Петрова Мария Сергеевна
    employee_id: 2, // Козлова Екатерина Александровна
    car_id: 3, // Volkswagen Tiguan
    application_date: '2023-11-20',
    status: 'in_progress'
  },
  {
    client_id: 1, // Иванов Иван Иванович
    employee_id: 3, // Новиков Дмитрий Сергеевич
    car_id: 4, // Kia Rio
    application_date: '2023-12-05',
    status: 'new'
  }
];

const seedRequests = async () => {
  try {
    const count = await Application.count();
    if (count === 0) {
      const existingRequests = await Application.findAll({
        attributes: ['client_id', 'employee_id', 'car_id', 'application_date'],
        where: {
          client_id: requestsData.map(r => r.client_id),
          employee_id: requestsData.map(r => r.employee_id),
          car_id: requestsData.map(r => r.car_id),
          application_date: requestsData.map(r => r.application_date)
        }
      });
      
      const existingRequestSet = new Set(existingRequests.map(r => `${r.client_id}-${r.employee_id}-${r.car_id}-${r.application_date}`));
      const newRequests = requestsData.filter(r => !existingRequestSet.has(`${r.client_id}-${r.employee_id}-${r.car_id}-${r.application_date}`));
      
      if (newRequests.length > 0) {
        console.log(`Добавляем ${newRequests.length} заявок:`);
        process.stdout.write('Прогресс: [');
      
        for (const [index, request] of newRequests.entries()) {
          await Application.create(request);
          process.stdout.write('.');
          if ((index + 1) % 5 === 0) process.stdout.write('|');
        }
      
        console.log(']\nУспешно добавлены заявки:');
        newRequests.forEach(r => 
          console.log(`- Клиент ID: ${r.client_id}, Сотрудник ID: ${r.employee_id}, Автомобиль ID: ${r.car_id}`)
        );
      } else {
        console.log('Все заявки уже существуют в базе');
      }
      await Application.bulkCreate(requestsData);
      console.log('Applications seeded successfully');
    } else {
      console.log('Applications already exist, skipping seeding');
    }
  } catch (err) {
    console.error('Error seeding applications:', err);
  }
};

module.exports = seedRequests;