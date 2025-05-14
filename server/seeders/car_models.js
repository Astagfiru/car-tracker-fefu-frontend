const { CarModel } = require('../models');

const carModelsData = [
  {
    brand: 'Toyota',
    model: 'Camry',
    seats: 5,
    fuelConsumption: 8.5,
    doors: 4,
    year: 2022,
    additionalInfo: JSON.stringify({
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
    fuelConsumption: 9.2,
    doors: 5,
    year: 2021,
    additionalInfo: JSON.stringify({
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
    fuelConsumption: 6.8,
    doors: 4,
    year: 2023,
    additionalInfo: JSON.stringify({
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
    fuelConsumption: 11.5,
    doors: 5,
    year: 2022,
    additionalInfo: JSON.stringify({
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
      await CarModel.bulkCreate(carModelsData);
      console.log('Car models seeded successfully');
    } else {
      console.log('Car models already exist, skipping seeding');
    }
  } catch (err) {
    console.error('Error seeding car models:', err);
  }
};

module.exports = seedCarModels;