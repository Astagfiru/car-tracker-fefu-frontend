/**
 * @module routes
 * @description Маршруты API для Car Tracker
 */

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const requestController = require('../controllers/requestController');

/**
 * @route GET /api/
 * @description Базовый маршрут API
 */
router.get('/', (req, res) => {
  res.send('Welcome to the Car Tracker API from routes!');
});

/**
 * @route GET /api/clients
 * @description Получить всех клиентов
 */
router.get('/clients', clientController.getAllClients);

/**
 * @route POST /api/clients
 * @description Создать нового клиента
 */

router.post('/clients', clientController.createClient);

/**
 * @route DELETE /api/clients/:id
 * @description Удалить клиента по ID
 */
router.delete('/clients/:id', clientController.deleteClient);

/**
 * @route GET /api/clients/:id
 * @description Получить клиента по ID
 */
router.get('/clients/:id', clientController.getClientById);

/**
 * @route GET /api/requests
 * @description Получить все заявки
 */
router.get('/requests', requestController.getAllRequests);

/**
 * @route GET /api/requests/:id
 * @description Получить заявку по ID
 */
router.get('/requests/:id', requestController.getRequestById);

/**
 * @route POST /api/requests
 * @description Создать новую заявку
 */
const requestValidator = require('../middleware/requestValidator');
router.post('/requests', requestValidator.validateCreateRequest, requestController.createRequest);

/**
 * @route PUT /api/requests/:id
 * @description Обновить заявку по ID
 */
router.put('/requests/:id', requestValidator.validateUpdateRequest, requestController.updateRequest);

module.exports = router;