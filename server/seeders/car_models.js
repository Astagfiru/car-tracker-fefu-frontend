const { CarModel } = require('../models');

const carModelsData = [
  {
    brand: 'Toyota',
    model: 'Camry',
    seats: 5,
    fuel_consumption: 8.5,
    doors: 4,
    year: 2022,
    additional_info: JSON.stringify({
      transmission: 'Автомат',
      engine: '2.5L',
      power: '200 л.с.',
      driveType: 'Передний'
    })
  },
  {
    brand: 'Volkswagen',
    model: 'Tiguan',
    seats: 5,
    fuel_consumption: 9.2,
    doors: 5,
    year: 2021,
    additional_info: JSON.stringify({
      transmission: 'Автомат',
      engine: '2.0L',
      power: '180 л.с.',
      driveType: 'Полный'
    })
  },
  {
    brand: 'Kia',
    model: 'Rio',
    seats: 5,
    fuel_consumption: 6.8,
    doors: 4,
    year: 2023,
    additional_info: JSON.stringify({
      transmission: 'Механика',
      engine: '1.6L',
      power: '123 л.с.',
      driveType: 'Передний'
    })
  },
  {
    brand: 'BMW',
    model: 'X5',
    seats: 7,
    fuel_consumption: 11.5,
    doors: 5,
    year: 2022,
    additional_info: JSON.stringify({
      transmission: 'Автомат',
      engine: '3.0L',
      power: '340 л.с.',
      driveType: 'Полный'
    })
  }
];

const seedCarModels = async () => {
  try {
    const count = await CarModel.count();
    if (count === 0) {
      const existingCarModels = await CarModel.findAll({
        attributes: ['brand', 'model', 'year'],
        where: {
          brand: carModelsData.map(c => c.brand),
          model: carModelsData.map(c => c.model),
          year: carModelsData.map(c => c.year)
        }
      });
      
      const existingCarModelSet = new Set(existingCarModels.map(c => `${c.brand}-${c.model}-${c.year}`));
      const newCarModels = carModelsData.filter(c => !existingCarModelSet.has(`${c.brand}-${c.model}-${c.year}`));
      
      if (newCarModels.length > 0) {
        console.log(`Добавляем ${newCarModels.length} моделей автомобилей:`);
        process.stdout.write('Прогресс: [');
      
        for (const [index, carModel] of newCarModels.entries()) {
          await CarModel.create(carModel);
          process.stdout.write('.');
          if ((index + 1) % 5 === 0) process.stdout.write('|');
        }
      
        console.log(']\nУспешно добавлены модели автомобилей:');
        newCarModels.forEach(c => 
          console.log(`- ${c.brand} ${c.model} (${c.year})`)
        );
      } else {
        console.log('Все модели автомобилей уже существуют в базе');
      }
      console.log('Car models seeded successfully');
    } else {
      console.log('Car models already exist, skipping seeding');
    }
  } catch (err) {
    console.error('Error seeding car models:', err);
  }
};

module.exports = seedCarModels;