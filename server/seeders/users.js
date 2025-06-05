const bcrypt = require('bcrypt');
const { User, Employee, Role } = require('../models');

async function hashPassword(plainText) {
  const SALT_ROUNDS = 10;
  return bcrypt.hash(plainText, SALT_ROUNDS);
}

module.exports = async function seedUsers() {
  const count = await User.count();
  if (count > 0) {
    console.log('Users already seeded, skipping.');
    return;
  }

  // Найти ID ролей для использования в usersData
  const adminRole = await Role.findOne({ where: { name: 'Администратор' } });
  const accountantRole = await Role.findOne({ where: { name: 'Бухгалтер' } });

  if (!adminRole || !accountantRole) {
    throw new Error('Required roles not found. Run seedRoles first.');
  }

  const usersData = [
    {
      login: 'admin',
      email: 'smirnov@cartracker.ru',
      password_hash: await hashPassword('Admin123'),
      role_id: adminRole.id,
    },
    {
      login: 'accountant',
      email: 'kozlova@cartracker.ru',
      password_hash: await hashPassword('Account123'),
      role_id: accountantRole.id,
    },
    {
      login: 'salesmgr',
      email: 'novikov@cartracker.ru',
      password_hash: await hashPassword('Sales123'),
      role_id: accountantRole.id,
    },
  ];

  const createdUsers = await User.bulkCreate(usersData, { returning: true });
  console.log('Users seeded successfully');

  // Связывание с Employee
  for (const user of createdUsers) {
    const employee = await Employee.findOne({ where: { email: user.email } });
    if (employee) {
      employee.user_id = user.id;
      await employee.save();
      console.log(
        `Linked Employee "${employee.last_name} ${employee.first_name}" (email=${employee.email}) => User "${user.login}"`
      );
    } else {
      console.warn(`No Employee found for User "${user.login}" (email=${user.email})`);
    }
  }
};