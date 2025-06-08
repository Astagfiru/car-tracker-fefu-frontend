/**
 * @module seeders/seedCarModels
 * @description Инициализация таблицы car_models
 */

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

module.exports = async function seedCarModels() {
  if (await CarModel.count() > 0) return;
  await CarModel.bulkCreate(carModelsData);
  console.log('CarModels seeded successfully');
};
