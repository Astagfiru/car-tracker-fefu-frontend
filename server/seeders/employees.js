const { Employee } = require('../models');

const employeesData = [
  {
    last_name: 'Смирнов',
    first_name: 'Алексей',
    middle_name: 'Петрович',
    phone: '+79001234567',
    email: 'smirnov@cartracker.ru',
    position: 'Менеджер по продажам'
  },
  {
    last_name: 'Козлова',
    first_name: 'Екатерина',
    middle_name: 'Александровна',
    phone: '+79009876543',
    email: 'kozlova@cartracker.ru',
    position: 'Старший менеджер'
  },
  {
    last_name: 'Новиков',
    first_name: 'Дмитрий',
    middle_name: 'Сергеевич',
    phone: '+79005554433',
    email: 'novikov@cartracker.ru',
    position: 'Консультант'
  }
];

const seedEmployees = async () => {
  try {
    console.log('Проверка существующих сотрудников...');
    const existingPhones = await Employee.findAll({
      attributes: ['phone'],
      where: {
        phone: employeesData.map(e => e.phone)
      }
    });
    
    const existingPhoneSet = new Set(existingPhones.map(e => e.phone));
    const newEmployees = employeesData.filter(e => !existingPhoneSet.has(e.phone));
    
    if (newEmployees.length > 0) {
      console.log(`Добавляем ${newEmployees.length} сотрудников:`);
      process.stdout.write('Прогресс: [');
      
      for (const [index, employee] of newEmployees.entries()) {
        await Employee.create(employee);
        process.stdout.write('.');
        if ((index + 1) % 5 === 0) process.stdout.write('|');
      }
      
      console.log(']\nУспешно добавлены сотрудники:');
      newEmployees.forEach(e => 
        console.log(`- ${e.last_name} ${e.first_name} (${e.position})`)
      );
    } else {
      console.log('Все сотрудники уже существуют в базе');
    }
  } catch (err) {
    console.error('Ошибка заполнения сотрудников:', err);
  }
};

module.exports = seedEmployees;