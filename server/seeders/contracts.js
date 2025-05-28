const { Contract } = require('../models');

const contractsData = [
  {
    application_id: 1, // Заявка от Иванова на Toyota Camry
    signing_date: '2023-10-20',
    contract_number: 'CT-2023-001',
    amount: 250000.00
  },
  {
    application_id: 2, // Заявка от Петровой на Volkswagen Tiguan
    signing_date: '2023-11-25',
    contract_number: 'CT-2023-002',
    amount: 320000.00
  }
];

const seedContracts = async () => {
  try {
    const count = await Contract.count();
    if (count === 0) {
      await Contract.bulkCreate(contractsData);
      console.log('Contracts seeded successfully');
    } else {
      console.log('Contracts already exist, skipping seeding');
    }
  } catch (err) {
    console.error('Error seeding contracts:', err);
  }
};

module.exports = seedContracts;