/**
 * @module routes
 * @description Маршруты API для Car Tracker
 */

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const applicationController = require('../controllers/applicationController');
const employeeController = require('../controllers/employeeController');
const carModelController = require('../controllers/carModelController');
const carController = require('../controllers/carController');
const contractsController = require('../controllers/contractsController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/login', authController.login);

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
 * @route GET /api/applications
 * @description Получить все заявки
 */
router.get('/applications', applicationController.getAllApplications);

/**
 * @route GET /api/applications/:id
 * @description Получить заявку по ID
 */
router.get('/applications/:id', applicationController.getApplicationById);

/**
 * @route POST /api/applications
 * @description Создать новую заявку
 */
const applicationValidator = require('../middleware/applicationValidator');
router.post('/applications', applicationValidator.CreateApplication, applicationController.createApplication);

/**
 * @route PUT /api/applications/:id
 * @description Обновить заявку по ID
 */
router.put('/applications/:id', applicationValidator.UpdateApplication, applicationController.updateApplication);

/**
 * @route DELETE /api/applications/:id
 * @description Удалить заявку по ID
 */
router.delete('/applications/:id', applicationController.deleteApplication);

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

/**
 * @route GET /api/contracts
 * @description Получить все контракты
 */
router.get('/contracts', contractsController.getAllContracts);

/**
 * @route GET /api/contracts/:id
 * @description Получить контракт по ID
 */
router.get('/contracts/:id', contractsController.getContractById);

/**
 * @route POST /api/contracts
 * @description Создать новый контракт
 */
router.post('/contracts', contractsController.createContract);

/**
 * @route PUT /api/contracts/:id
 * @description Обновить контракт по ID
 */
router.put('/contracts/:id', contractsController.updateContract);

/**
 * @route DELETE /api/contracts/:id
 * @description Удалить контракт по ID
 */
router.delete('/contracts/:id', contractsController.deleteContract);

/**
 * @route GET /api/users/:login/role
 * @description Получить роль пользователя по логину
 */
router.get('/users/:login/role', userController.getUserRoleByLogin);

/**
 * @route GET /api/users/:login/employee
 * @description Получить информацию о сотруднике и его роли по логину
 */
router.get('/users/:login/employee', userController.getEmployeeWithRoleByLogin);

// Создание нового пользователя
router.post('/users', userController.createUser);

// Удаление пользователя по логину
router.delete('/users/:login', userController.deleteUser);

module.exports = router;