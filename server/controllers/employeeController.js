/**
 * @module controllers/employeeController
 * @description Контроллер для управления сотрудниками
 */

const { Employee, Request, User } = require('../models');

/**
 * @function getAllEmployees
 * @description Получение списка всех сотрудников
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

/**
 * @function getEmployeeById
 * @description Получение сотрудника по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const include = req.query.include;
    let options = { where: { id } };
    
    // Если запрошены связанные заявки
    if (include === 'clientApplication') {
      options.include = [{ model: Request, as: 'employeeRequests' }];
    }
    
    const employee = await Employee.findOne(options);
    
    if (!employee) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Сотрудник не найден' 
      });
    }
    
    res.json({
      status: 'success',
      data: employee
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @function createEmployee
 * @description Создание нового сотрудника с привязкой к пользователю
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.createEmployee = async (req, res, next) => {
  try {
    const {  last_name, first_name, middle_name, phone, email, position, user_id } = req.body;

    // Проверка наличия обязательного поля user_id
    if (!user_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Поле user_id обязательно для создания сотрудника.'
      });
    }

    // Проверка существования пользователя и получение его email
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Пользователь с указанным user_id не существует.'
      });
    }

    // Проверка уникальности user_id
    const existingEmployeeByUserId = await Employee.findOne({ where: { user_id } });
    if (existingEmployeeByUserId) {
      return res.status(409).json({
        status: 'error',
        message: 'Пользователь с указанным user_id уже связан с сотрудником.'
      });
    }

    let employeeEmail = user.email;
    if (email) {
      if (email !== user.email) {
        return res.status(400).json({
          status: 'error',
          message: 'Email сотрудника должен совпадать с email связанного пользователя.'
        });
      }
      employeeEmail = email;
    }

    if (employeeEmail) {
      const existingEmployeeByEmail = await Employee.findOne({ where: { email: employeeEmail } });
      if (existingEmployeeByEmail) {
        return res.status(409).json({
          status: 'error',
          message: 'Email уже используется другим сотрудником.'
        });
      }
    }

    const employee = await Employee.create({ 
      last_name, 
      first_name, 
      middle_name, 
      phone, 
      email: employeeEmail, 
      position,
      user_id
    });

    // Ответ с данными созданного сотрудника
    res.status(201).json({
      status: 'success',
      data: employee
    });
  } catch (err) {
    next(err);
  }
};


/**
 * @function updateEmployee
 * @description Обновление данных сотрудника по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { last_name, first_name, middle_name, phone, email, position } = req.body;
    
    const employee = await Employee.findByPk(id);
    
    if (!employee) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Сотрудник не найден' 
      });
    }
    
    await employee.update({ 
      last_name, 
      first_name, 
      middle_name, 
      phone, 
      email, 
      position 
    });
    
    res.json({
      status: 'success',
      data: employee
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @function deleteEmployee
 * @description Удаление сотрудника по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    
    if (!employee) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Сотрудник не найден' 
      });
    }
    
    await employee.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};