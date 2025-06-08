const seedClients = require('./clients');
const seedCarModels = require('./car_models');
const seedCars = require('./cars');
const seedEmployees = require('./employees');
const seedRoles = require('./roles');
const seedUsers = require('./users');
const seedRequests = require('./requests');
const seedContracts = require('./contracts');

module.exports = async () => {
  try {
    await seedClients();
    await seedCarModels();
    await seedCars();
    await seedEmployees();
    await seedRoles();
    await seedUsers();
    await seedRequests();
    await seedContracts();

    console.log('All seeders completed successfully');
  } catch (err) {
    console.error('Error running seeders:', err);
    throw err;
  }
};