const { User, Role, Employee } = require('../models');
const bcrypt = require('bcrypt');

exports.getUserRoleByLogin = async (req, res, next) => {
  try {
    const { login } = req.params;

    const user = await User.findOne({
      where: { login },
      include: {
        model: Role,
        as: 'roles',
        attributes: ['name']
      }
    });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Пользователь не найден' });
    }
    
    res.json({
      status: 'success',
      data: {
        login: user.login,
        role: user.roles.name,
        profile_image: user.profile_image 
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeWithRoleByLogin = async (req, res, next) => {
  try {
    const { login } = req.params;

    const user = await User.findOne({
      where: { login },
      include: [
        {
          model: Employee,
          as: 'employees',
        },
        {
          model: Role,
          as: 'roles',
          attributes: ['name']
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Пользователь не найден' });
    }

    const employee = user.employees;

    if (!employee) {
      return res.status(404).json({ status: 'error', message: 'Сотрудник не найден' });
    }

    res.json({
      status: 'success',
      data: {
        user: {
          login: user.login,
          email: user.email,
          profile_image: user.profile_image 
        },
        employee: {
          last_name: employee.last_name,
          first_name: employee.first_name,
          middle_name: employee.middle_name,
          phone: employee.phone,
          email: employee.email,
          position: employee.position
        },
        role: {
          name: user.roles.name
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { login, email, password, role_id, profile_image } = req.body; 

    if (!login || !email || !password || !role_id) {
      return res.status(400).json({ status: 'error', message: 'Все поля обязательны' });
    }

    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ status: 'error', message: 'Роль не найдена' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ status: 'error', message: 'Email уже используется' });
    }

    const existingLogin = await User.findOne({ where: { login } });
    if (existingLogin) {
      return res.status(409).json({ status: 'error', message: 'Login уже используется' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ 
      login, 
      email, 
      password_hash: hashedPassword, 
      role_id,
      profile_image: profile_image || null 
    });

    const userData = newUser.toJSON();
    delete userData.password_hash;

    res.status(201).json({ status: 'success', data: userData });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { login } = req.params;

    const deleted = await User.destroy({ where: { login } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ status: 'error', message: 'Пользователь не найден' });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateProfileImage = async (req, res, next) => {
  try {
    const { login } = req.params;
    const { profile_image } = req.body;

    if (!profile_image) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'URL изображения обязателен' 
      });
    }

    const [updated] = await User.update(
      { profile_image },
      { where: { login } }
    );

    if (updated) {
      const updatedUser = await User.findOne({ 
        where: { login },
        attributes: { exclude: ['password_hash'] }
      });
      return res.json({
        status: 'success',
        data: updatedUser
      });
    } else {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Пользователь не найден' 
      });
    }
  } catch (err) {
    next(err);
  }
};