const { Car } = require('../models');

const carsData = [
  {
    model_id: 1, // Toyota Camry
    in_stock: true,
    vin: 'JT2BF22K1W0123456',
    mileage: 5000,
    price: 2500000.00
  },
  {
    model_id: 1, // Toyota Camry
    in_stock: true,
    vin: 'JT2BF22K1W0123457',
    mileage: 7500,
    price: 2450000.00
  },
  {
    model_id: 2, // Volkswagen Tiguan
    in_stock: true,
    vin: 'WVGZZZ5NZLW123456',
    mileage: 3000,
    price: 2800000.00
  },
  {
    model_id: 3, // Kia Rio
    in_stock: true,
    vin: 'KNADM4A37F6123456',
    mileage: 1000,
    price: 1500000.00
  },
  {
    model_id: 4, // BMW X5
    in_stock: true,
    vin: 'WBAKJ4C50JB123456',
    mileage: 2000,
    price: 5500000.00
  }
];

const seedCars = async () => {
  try {
    const count = await Car.count();
    if (count === 0) {
      const existingCars = await Car.findAll({
        attributes: ['vin'],
        where: {
          vin: carsData.map(c => c.vin)
        }
      });
      
      const existingCarSet = new Set(existingCars.map(c => c.vin));
      const newCars = carsData.filter(c => !existingCarSet.has(c.vin));
      
      if (newCars.length > 0) {
        console.log(`Добавляем ${newCars.length} автомобилей:`);
        process.stdout.write('Прогресс: [');
      
        for (const [index, car] of newCars.entries()) {
          await Car.create(car);
          process.stdout.write('.');
          if ((index + 1) % 5 === 0) process.stdout.write('|');
        }
      
        console.log(']\nУспешно добавлены автомобили:');
        newCars.forEach(c => 
          console.log(`- VIN: ${c.vin}`)
        );
      } else {
        console.log('Все автомобили уже существуют в базе');
      }
      console.log('Cars seeded successfully');
    } else {
      console.log('Cars already exist, skipping seeding');
    }
  } catch (err) {
    console.error('Error seeding cars:', err);
  }
};

module.exports = seedCars;