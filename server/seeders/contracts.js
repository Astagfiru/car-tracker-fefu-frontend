/**
 * @module seeders/seedContracts
 * @description Инициализация таблицы contracts
 */

const { Contract } = require('../models');

const contractsData = [
  {
    application_id: 1,
    signing_date: '2023-10-20',
    contract_number: 'CT-2023-001',
    amount: 250000.00
  },
  {
    application_id: 2,
    signing_date: '2023-11-25',
    contract_number: 'CT-2023-002',
    amount: 320000.00
  }
];

module.exports = async function seedContracts() {
  if (await Contract.count() > 0) return;

  await Contract.bulkCreate(contractsData);
  console.log('Contracts seeded successfully');
};
