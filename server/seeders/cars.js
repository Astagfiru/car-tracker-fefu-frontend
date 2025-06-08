/**
 * @module seeders/seedCars
 * @description Инициализация таблицы cars
 */

const { Car } = require('../models');

const carsData = [
  { model_id: 1, in_stock: true, vin: 'JT2BF22K1W0123456', mileage: 5000, price: 2500000.00 },
  { model_id: 1, in_stock: true, vin: 'JT2BF22K1W0123457', mileage: 7500, price: 2450000.00 },
  { model_id: 2, in_stock: true, vin: 'WVGZZZ5NZLW123456', mileage: 3000, price: 2800000.00 },
  { model_id: 3, in_stock: true, vin: 'KNADM4A37F6123456', mileage: 1000, price: 1500000.00 },
  { model_id: 4, in_stock: true, vin: 'WBAKJ4C50JB123456', mileage: 2000, price: 5500000.00 }
];

module.exports = async function seedCars() {
  if (await Car.count() > 0) return;

  await Car.bulkCreate(carsData);
  console.log('Cars seeded successfully');
};
