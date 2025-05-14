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
    const existingPhones = await Employee.findAll({
      attributes: ['phone'],
      where: {
        phone: employeesData.map(e => e.phone)
      }
    });
    
    const existingPhoneSet = new Set(existingPhones.map(e => e.phone));
    const newEmployees = employeesData.filter(e => !existingPhoneSet.has(e.phone));
    
    if (newEmployees.length > 0) {
      await Employee.bulkCreate(newEmployees);
      console.log(`Employees seeded successfully (${newEmployees.length} added)`);
    } else {
      console.log('All employees already exist, skipping seeding');
    }
  } catch (err) {
    console.error('Error seeding employees:', err);
  }
};

module.exports = seedEmployees;