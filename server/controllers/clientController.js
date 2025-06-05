/**
 * @module controllers/clientController
 * @description Контроллер для управления клиентами
 */

const { Client } = require('../models');

/**
 * @function getAllClients
 * @description Получение списка всех клиентов
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    next(err);
  }
};

/**
 * @function deleteClient
 * @description Удаление клиента по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    
    if (!client) {
      return res.status(404).json({ message: 'Клиент не найден' });
    }
    
    await client.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

/**
 * @function updateClient
 * @description Обновление данных клиента по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { surname, name, patronymic, phone, email, passportSeries, passportNumber, passportIssuer, passportIssueDate } = req.body;
    
    const client = await Client.findByPk(id);
    
    if (!client) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Клиент не найден' 
      });
    }
    
    await client.update({ 
      surname, 
      name, 
      patronymic, 
      phone, 
      email, 
      passportSeries, 
      passportNumber, 
      passportIssuer, 
      passportIssueDate 
    });
    
    res.json({
      status: 'success',
      data: client
    });
  } catch (err) {
    next(err);
  }
};


/**
 * @function getClientById
 * @description Получение клиента по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    
    if (!client) {
      return res.status(404).json({ message: 'Клиент не найден' });
    }
    
    res.json(client);
  } catch (err) {
    next(err);
  }
};

/**
 * @function createClient
 * @description Создание нового клиента
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.createClient = async (req, res, next) => {
  try {
    const { last_name, first_name, middle_name, phone, email, passport_series, passport_number, issued_by, issue_date } = req.body;
    
    const existingClient = await Client.findOne({ where: { email } });
    if (existingClient) {
      return res.status(409).json({ 
        status: 'error',
        message: 'Клиент с таким email уже существует'
      });
    }
    
    const client = await Client.create({ 
      last_name, 
      first_name, 
      middle_name, 
      phone, 
      email, 
      passport_series, passport_number, issued_by, issue_date
    });
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};

/**
 * @function deleteClient
 * @description Удаление клиента по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    
    if (!client) {
      return res.status(404).json({ message: 'Клиент не найден' });
    }
    
    await client.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

/**
 * @function updateClient
 * @description Обновление данных клиента по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { surname, name, patronymic, phone, email, passportSeries, passportNumber, passportIssuer, passportIssueDate } = req.body;
    
    const client = await Client.findByPk(id);
    
    if (!client) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Клиент не найден' 
      });
    }
    
    await client.update({ 
      surname, 
      name, 
      patronymic, 
      phone, 
      email, 
      passportSeries, 
      passportNumber, 
      passportIssuer, 
      passportIssueDate 
    });
    
    res.json({
      status: 'success',
      data: client
    });
  } catch (err) {
    next(err);
  }
};