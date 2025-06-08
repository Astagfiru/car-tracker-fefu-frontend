const seedCarModels = require('./car_models');
const seedCars = require('./cars');
const seedClients = require('./clients');
const seedRoles = require('./roles');
const seedUsers = require('./users');
const seedEmployees = require('./employees');
const seedApplications = require('./applications');
const seedContracts = require('./contracts');

module.exports = async () => {
  try {
    await seedCarModels();
    await seedCars();
    await seedClients();
    await seedRoles();
    await seedUsers();
    await seedEmployees();
    await seedApplications();
    await seedContracts();
    console.log('All seeders completed successfully');
  } catch (err) {
    console.error('Error running seeders:', err);
    throw err;
  }
};