const seedClients = require('./clients');
const seedCars = require('./cars');
const seedContracts = require('./contracts');
const seedEmployees = require('./employees');
const seedRequests = require('./requests');
const seedCarModels = require('./car_models');

module.exports = async () => {
  try {
    await seedClients();
    await seedCarModels();
    await seedCars();
    await seedEmployees();
    await seedRequests();
    await seedContracts();
    console.log('All seeders completed successfully');
  } catch (err) {
    console.error('Error running seeders:', err);
    throw err;
  }
};