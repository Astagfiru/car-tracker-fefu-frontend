const { Role } = require('../models');

const rolesData = [
  {
    level_of_access: 100,   
    name: 'Администратор'
  },
  {
    level_of_access: 50,
    name: 'Бухгалтер'
  }
];

module.exports = async function seedRoles() {
  const count = await Role.count();
  if (count > 0) return;

  await Role.bulkCreate(rolesData);
  console.log('Roles seeded successfully');
};
