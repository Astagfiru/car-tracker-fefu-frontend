/**
 * @module routes
 * @description Маршруты API для Car Tracker
 */

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const requestController = require('../controllers/requestController');
const employeeController = require('../controllers/employeeController');
const carModelController = require('../controllers/carModelController');
const carController = require('../controllers/carController');

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
 * @route PUT /api/clients/:id
 * @description Обновить клиента по ID
 */
router.put('/clients/:id', clientController.updateClient);

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

/**
 * @route DELETE /api/requests/:id
 * @description Удалить заявку по ID
 */
router.delete('/requests/:id', requestController.deleteRequest);

/**
 * @route GET /api/employees
 * @description Получить всех сотрудников
 */
router.get('/employees', employeeController.getAllEmployees);

/**
 * @route GET /api/employees/:id
 * @description Получить сотрудника по ID
 */
router.get('/employees/:id', employeeController.getEmployeeById);

/**
 * @route POST /api/employees
 * @description Создать нового сотрудника
 */
router.post('/employees', employeeController.createEmployee);

/**
 * @route PUT /api/employees/:id
 * @description Обновить сотрудника по ID
 */
router.put('/employees/:id', employeeController.updateEmployee);

/**
 * @route DELETE /api/employees/:id
 * @description Удалить сотрудника по ID
 */
router.delete('/employees/:id', employeeController.deleteEmployee);

/**
 * @route GET /api/carModels
 * @description Получить все модели автомобилей
 */
router.get('/carModels', carModelController.getAllCarModels);

/**
 * @route GET /api/carModels/:id
 * @description Получить модель автомобиля по ID
 */
router.get('/carModels/:id', carModelController.getCarModelById);

/**
 * @route POST /api/carModels
 * @description Создать новую модель автомобиля
 */
router.post('/carModels', carModelController.createCarModel);

/**
 * @route PUT /api/carModels/:id
 * @description Обновить модель автомобиля по ID
 */
router.put('/carModels/:id', carModelController.updateCarModel);

/**
 * @route DELETE /api/carModels/:id
 * @description Удалить модель автомобиля по ID
 */
router.delete('/carModels/:id', carModelController.deleteCarModel);

/**
 * @route GET /api/cars
 * @description Получить все автомобили
 */
router.get('/cars', carController.getAllCars);

/**
 * @route GET /api/cars/:id
 * @description Получить автомобиль по ID
 */
router.get('/cars/:id', carController.getCarById);

/**
 * @route POST /api/cars
 * @description Создать новый автомобиль
 */
router.post('/cars', carController.createCar);

/**
 * @route PUT /api/cars/:id
 * @description Обновить автомобиль по ID
 */
router.put('/cars/:id', carController.updateCar);

/**
 * @route DELETE /api/cars/:id
 * @description Удалить автомобиль по ID
 */
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;