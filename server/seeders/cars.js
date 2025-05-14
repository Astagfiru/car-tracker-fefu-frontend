const { Car } = require('../models');

const carsData = [
  {
    model_id: 1, // Toyota Camry
    available: true,
    vin: 'JT2BF22K1W0123456',
    mileage: 5000,
    price: 2500000.00
  },
  {
    model_id: 1, // Toyota Camry
    available: true,
    vin: 'JT2BF22K1W0123457',
    mileage: 7500,
    price: 2450000.00
  },
  {
    model_id: 2, // Volkswagen Tiguan
    available: true,
    vin: 'WVGZZZ5NZLW123456',
    mileage: 3000,
    price: 2800000.00
  },
  {
    model_id: 3, // Kia Rio
    available: true,
    vin: 'KNADM4A37F6123456',
    mileage: 1000,
    price: 1500000.00
  },
  {
    model_id: 4, // BMW X5
    available: true,
    vin: 'WBAKJ4C50JB123456',
    mileage: 2000,
    price: 5500000.00
  }
];

const seedCars = async () => {
  try {
    const count = await Car.count();
    if (count === 0) {
      await Car.bulkCreate(carsData);
      console.log('Cars seeded successfully');
    } else {
      console.log('Cars already exist, skipping seeding');
    }
  } catch (err) {
    console.error('Error seeding cars:', err);
  }
};

module.exports = seedCars;