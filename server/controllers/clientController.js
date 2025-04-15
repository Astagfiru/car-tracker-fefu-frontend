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
 * @function createClient
 * @description Создание нового клиента
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.createClient = async (req, res, next) => {
  try {
    const { surname, name, patronymic, phone, email, passportSeries, passportNumber, passportIssuer, passportIssueDate } = req.body;
    const client = await Client.create({ 
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
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};