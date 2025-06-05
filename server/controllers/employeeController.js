/**
 * @module controllers/employeeController
 * @description Контроллер для управления сотрудниками
 */

const { Employee, Request } = require('../models');

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
    const { surname, name, patronymic, phone, email, position, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Поле user_id обязательно для создания сотрудника.'
      });
    }

    const employee = await Employee.create({ 
      surname, 
      name, 
      patronymic, 
      phone, 
      email, 
      position,
      user_id
    });

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
    const { surname, name, patronymic, phone, email, position } = req.body;
    
    const employee = await Employee.findByPk(id);
    
    if (!employee) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Сотрудник не найден' 
      });
    }
    
    await employee.update({ 
      surname, 
      name, 
      patronymic, 
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