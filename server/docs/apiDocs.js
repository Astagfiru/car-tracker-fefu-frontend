/**
 * @module docs/apiDocs
 * @description Документация API для Car Tracker
 */

/**
 * @apiDefine ErrorResponse
 * @apiError {String} status Статус ответа (всегда "error" для ошибок)
 * @apiError {String} message Сообщение об ошибке
 * @apiError {Object[]} [errors] Массив объектов с детальной информацией об ошибках валидации
 * @apiError {String} errors.field Название поля с ошибкой
 * @apiError {String} errors.message Сообщение об ошибке для конкретного поля
 */

/**
 * @apiDefine SuccessResponse
 * @apiSuccess {String} status Статус ответа (всегда "success" для успешных операций)
 * @apiSuccess {Object} data Данные ответа
 */

/**
 * @api {get} /api/ Приветственное сообщение
 * @apiName GetWelcome
 * @apiGroup General
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Приветственное сообщение API
 */

/**
 * @api {get} /api/clients Получить всех клиентов
 * @apiName GetAllClients
 * @apiGroup Clients
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} clients Список всех клиентов
 * @apiSuccess {Number} clients.id Уникальный идентификатор клиента
 * @apiSuccess {String} clients.surname Фамилия клиента
 * @apiSuccess {String} clients.name Имя клиента
 * @apiSuccess {String} [clients.patronymic] Отчество клиента
 * @apiSuccess {String} [clients.phone] Телефон клиента
 * @apiSuccess {String} clients.email Email клиента
 * @apiSuccess {String} clients.passportSeries Серия паспорта
 * @apiSuccess {String} clients.passportNumber Номер паспорта
 * @apiSuccess {String} clients.passportIssuer Кем выдан паспорт
 * @apiSuccess {String} clients.passportIssueDate Дата выдачи паспорта
 * @apiSuccess {String} clients.createdAt Дата создания записи
 * @apiSuccess {String} clients.updatedAt Дата последнего обновления записи
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {post} /api/clients Создать нового клиента
 * @apiName CreateClient
 * @apiGroup Clients
 * @apiVersion 1.0.0
 *
 * @apiParam {String} surname Фамилия клиента
 * @apiParam {String} name Имя клиента
 * @apiParam {String} [patronymic] Отчество клиента
 * @apiParam {String} [phone] Телефон клиента (формат: +7XXXXXXXXXX или 8XXXXXXXXXX)
 * @apiParam {String} email Email клиента
 * @apiParam {String} passportSeries Серия паспорта (4 цифры)
 * @apiParam {String} passportNumber Номер паспорта (6 цифр)
 * @apiParam {String} passportIssuer Кем выдан паспорт
 * @apiParam {String} passportIssueDate Дата выдачи паспорта (формат: YYYY-MM-DD)
 *
 * @apiSuccess {Number} id Уникальный идентификатор созданного клиента
 * @apiSuccess {String} surname Фамилия клиента
 * @apiSuccess {String} name Имя клиента
 * @apiSuccess {String} [patronymic] Отчество клиента
 * @apiSuccess {String} [phone] Телефон клиента
 * @apiSuccess {String} email Email клиента
 * @apiSuccess {String} passportSeries Серия паспорта
 * @apiSuccess {String} passportNumber Номер паспорта
 * @apiSuccess {String} passportIssuer Кем выдан паспорт
 * @apiSuccess {String} passportIssueDate Дата выдачи паспорта
 * @apiSuccess {String} createdAt Дата создания записи
 * @apiSuccess {String} updatedAt Дата последнего обновления записи
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {get} /api/clients/:id Получить клиента по ID
 * @apiName GetClientById
 * @apiGroup Clients
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор клиента
 * @apiParam {String} [include] Включение связанных данных (clientApplication)
 *
 * @apiSuccess {Number} id Уникальный идентификатор клиента
 * @apiSuccess {String} surname Фамилия клиента
 * @apiSuccess {String} name Имя клиента
 * @apiSuccess {String} [patronymic] Отчество клиента
 * @apiSuccess {String} [phone] Телефон клиента
 * @apiSuccess {String} email Email клиента
 * @apiSuccess {String} passportSeries Серия паспорта
 * @apiSuccess {String} passportNumber Номер паспорта
 * @apiSuccess {String} passportIssuer Кем выдан паспорт
 * @apiSuccess {String} passportIssueDate Дата выдачи паспорта
 * @apiSuccess {Object[]} [clientRequests] Заявки клиента (если указан include=clientApplication)
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {put} /api/clients/:id Обновить клиента
 * @apiName UpdateClient
 * @apiGroup Clients
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор клиента
 * @apiParam {String} [surname] Фамилия клиента
 * @apiParam {String} [name] Имя клиента
 * @apiParam {String} [patronymic] Отчество клиента
 * @apiParam {String} [phone] Телефон клиента
 * @apiParam {String} [email] Email клиента
 * @apiParam {String} [passportSeries] Серия паспорта
 * @apiParam {String} [passportNumber] Номер паспорта
 * @apiParam {String} [passportIssuer] Кем выдан паспорт
 * @apiParam {String} [passportIssueDate] Дата выдачи паспорта
 *
 * @apiUse SuccessResponse
 * @apiUse ErrorResponse
 */

/**
 * @api {delete} /api/clients/:id Удалить клиента
 * @apiName DeleteClient
 * @apiGroup Clients
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор клиента
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {get} /api/employees Получить всех сотрудников
 * @apiName getAllEmployees
 * @apiGroup Employees
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} employees Список всех сотрудников
 * @apiSuccess {Number} employees.id Уникальный идентификатор сотрудника
 * @apiSuccess {String} employees.surname Фамилия сотрудника
 * @apiSuccess {String} employees.name Имя сотрудника
 * @apiSuccess {String} [employees.patronymic] Отчество сотрудника
 * @apiSuccess {String} [employees.phone] Телефон сотрудника
 * @apiSuccess {String} [employees.email] Email сотрудника
 * @apiSuccess {String} [employees.position] Должность сотрудника
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {get} /api/employees/:id Получить сотрудника по ID
 * @apiName GetEmployeeById
 * @apiGroup Employees
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор сотрудника
 * @apiParam {String} [include] Включение связанных данных (clientApplication)
 *
 * @apiSuccess {Number} id Уникальный идентификатор сотрудника
 * @apiSuccess {String} surname Фамилия сотрудника
 * @apiSuccess {String} name Имя сотрудника
 * @apiSuccess {String} [patronymic] Отчество сотрудника
 * @apiSuccess {String} [phone] Телефон сотрудника
 * @apiSuccess {String} [email] Email сотрудника
 * @apiSuccess {String} [position] Должность сотрудника
 * @apiSuccess {Object[]} [employeeRequests] Заявки сотрудника (если указан include=clientApplication)
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {post} /api/employees Создать нового сотрудника
 * @apiName CreateEmployee
 * @apiGroup Employees
 * @apiVersion 1.0.0
 *
 * @apiParam {String} surname Фамилия сотрудника
 * @apiParam {String} name Имя сотрудника
 * @apiParam {String} [patronymic] Отчество сотрудника
 * @apiParam {String} [phone] Телефон сотрудника
 * @apiParam {String} [email] Email сотрудника
 * @apiParam {String} [position] Должность сотрудника
 *
 * @apiUse SuccessResponse
 * @apiUse ErrorResponse
 */

/**
 * @api {put} /api/employees/:id Обновить сотрудника
 * @apiName UpdateEmployee
 * @apiGroup Employees
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор сотрудника
 * @apiParam {String} [surname] Фамилия сотрудника
 * @apiParam {String} [name] Имя сотрудника
 * @apiParam {String} [patronymic] Отчество сотрудника
 * @apiParam {String} [phone] Телефон сотрудника
 * @apiParam {String} [email] Email сотрудника
 * @apiParam {String} [position] Должность сотрудника
 *
 * @apiUse SuccessResponse
 * @apiUse ErrorResponse
 */

/**
 * @api {delete} /api/employees/:id Удалить сотрудника
 * @apiName DeleteEmployee
 * @apiGroup Employees
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор сотрудника
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {get} /api/carModels Получить все модели автомобилей
 * @apiName GetAllCarModels
 * @apiGroup CarModels
 * @apiVersion 1.0.0
 *
 * @apiParam {String} [include] Включение связанных данных (carModel)
 *
 * @apiSuccess {Object[]} carModels Список всех моделей автомобилей
 * @apiSuccess {Number} carModels.id Уникальный идентификатор модели
 * @apiSuccess {String} carModels.brand Марка автомобиля
 * @apiSuccess {String} carModels.model Модель автомобиля
 * @apiSuccess {Number} [carModels.year] Год выпуска
 * @apiSuccess {Number} [carModels.seats] Количество мест
 * @apiSuccess {Number} [carModels.doors] Количество дверей
 * @apiSuccess {Number} [carModels.fuelConsumption] Расход топлива
 * @apiSuccess {String} [carModels.additionalInfo] Дополнительная информация
 * @apiSuccess {Object[]} [carModels.cars] Автомобили данной модели (если указан include=carModel)
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {get} /api/carModels/:id Получить модель автомобиля по ID
 * @apiName GetCarModelById
 * @apiGroup CarModels
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор модели
 * @apiParam {String} [include] Включение связанных данных (carModel)
 *
 * @apiSuccess {Number} id Уникальный идентификатор модели
 * @apiSuccess {String} brand Марка автомобиля
 * @apiSuccess {String} model Модель автомобиля
 * @apiSuccess {Number} [year] Год выпуска
 * @apiSuccess {Number} [seats] Количество мест
 * @apiSuccess {Number} [doors] Количество дверей
 * @apiSuccess {Number} [fuelConsumption] Расход топлива
 * @apiSuccess {String} [additionalInfo] Дополнительная информация
 * @apiSuccess {Object[]} [cars] Автомобили данной модели (если указан include=carModel)
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {post} /api/carModels Создать новую модель автомобиля
 * @apiName CreateCarModel
 * @apiGroup CarModels
 * @apiVersion 1.0.0
 *
 * @apiParam {String} brand Марка автомобиля
 * @apiParam {String} model Модель автомобиля
 * @apiParam {Number} [year] Год выпуска
 * @apiParam {Number} [seats] Количество мест
 * @apiParam {Number} [doors] Количество дверей
 * @apiParam {Number} [fuelConsumption] Расход топлива
 * @apiParam {String} [additionalInfo] Дополнительная информация
 *
 * @apiUse SuccessResponse
 * @apiUse ErrorResponse
 */

/**
 * @api {put} /api/carModels/:id Обновить модель автомобиля
 * @apiName UpdateCarModel
 * @apiGroup CarModels
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор модели
 * @apiParam {String} [brand] Марка автомобиля
 * @apiParam {String} [model] Модель автомобиля
 * @apiParam {Number} [year] Год выпуска
 * @apiParam {Number} [seats] Количество мест
 * @apiParam {Number} [doors] Количество дверей
 * @apiParam {Number} [fuelConsumption] Расход топлива
 * @apiParam {String} [additionalInfo] Дополнительная информация
 *
 * @apiUse SuccessResponse
 * @apiUse ErrorResponse
 */

/**
 * @api {delete} /api/carModels/:id Удалить модель автомобиля
 * @apiName DeleteCarModel
 * @apiGroup CarModels
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор модели
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {get} /api/cars Получить все автомобили
 * @apiName GetAllCars
 * @apiGroup Cars
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} cars Список всех автомобилей
 * @apiSuccess {Number} cars.id Уникальный идентификатор автомобиля
 * @apiSuccess {Number} cars.model_id ID модели автомобиля
 * @apiSuccess {Boolean} cars.available Доступность автомобиля
 * @apiSuccess {String} cars.vin VIN-номер автомобиля
 * @apiSuccess {Number} cars.mileage Пробег автомобиля
 * @apiSuccess {Number} cars.price Цена автомобиля
 * @apiSuccess {Object} cars.carModel Информация о модели автомобиля
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {get} /api/cars/:id Получить автомобиль по ID
 * @apiName GetCarById
 * @apiGroup Cars
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор автомобиля
 *
 * @apiSuccess {Number} id Уникальный идентификатор автомобиля
 * @apiSuccess {Number} model_id ID модели автомобиля
 * @apiSuccess {Boolean} available Доступность автомобиля
 * @apiSuccess {String} vin VIN-номер автомобиля
 * @apiSuccess {Number} mileage Пробег автомобиля
 * @apiSuccess {Number} price Цена автомобиля
 * @apiSuccess {Object} carModel Информация о модели автомобиля
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {post} /api/cars Создать новый автомобиль
 * @apiName CreateCar
 * @apiGroup Cars
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} model_id ID модели автомобиля
 * @apiParam {Boolean} [available=true] Доступность автомобиля
 * @apiParam {String} vin VIN-номер автомобиля
 * @apiParam {Number} mileage Пробег автомобиля
 * @apiParam {Number} price Цена автомобиля
 *
 * @apiUse SuccessResponse
 * @apiUse ErrorResponse
 */

/**
 * @api {put} /api/cars/:id Обновить автомобиль
 * @apiName UpdateCar
 * @apiGroup Cars
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор автомобиля
 * @apiParam {Number} [model_id] ID модели автомобиля
 * @apiParam {Boolean} [available] Доступность автомобиля
 * @apiParam {String} [vin] VIN-номер автомобиля
 * @apiParam {Number} [mileage] Пробег автомобиля
 * @apiParam {Number} [price] Цена автомобиля
 *
 * @apiUse SuccessResponse
 * @apiUse ErrorResponse
 */

/**
 * @api {delete} /api/cars/:id Удалить автомобиль
 * @apiName DeleteCar
 * @apiGroup Cars
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор автомобиля
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {get} /api/requests Получить все заявки
 * @apiName GetAllRequests
 * @apiGroup Requests
 * @apiVersion 1.0.0
 *
 * @apiParam {String} [status] Фильтр по статусу заявки (НОВАЯ, В РАБОТЕ, ЗАВЕРШЕНА, ОТМЕНЕНА)
 *
 * @apiSuccess {Number} count Количество заявок
 * @apiSuccess {Object[]} data Список заявок
 * @apiSuccess {Number} data.id Уникальный идентификатор заявки
 * @apiSuccess {Number} data.client_id ID клиента
 * @apiSuccess {Number} data.employee_id ID сотрудника
 * @apiSuccess {Number} data.car_id ID автомобиля
 * @apiSuccess {String} data.date Дата заявки
 * @apiSuccess {String} data.status Статус заявки
 * @apiSuccess {Object} data.client Информация о клиенте
 * @apiSuccess {Object} data.employee Информация о сотруднике
 * @apiSuccess {Object} data.car Информация об автомобиле
 * @apiSuccess {Object} [data.contract] Информация о контракте
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {get} /api/requests/:id Получить заявку по ID
 * @apiName GetRequestById
 * @apiGroup Requests
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор заявки
 *
 * @apiSuccess {String} status Статус ответа (success)
 * @apiSuccess {Object} data Данные заявки
 * @apiSuccess {Number} data.id Уникальный идентификатор заявки
 * @apiSuccess {Number} data.client_id ID клиента
 * @apiSuccess {Number} data.employee_id ID сотрудника
 * @apiSuccess {Number} data.car_id ID автомобиля
 * @apiSuccess {String} data.date Дата заявки
 * @apiSuccess {String} data.status Статус заявки
 * @apiSuccess {Object} data.client Информация о клиенте
 * @apiSuccess {Object} data.employee Информация о сотруднике
 * @apiSuccess {Object} data.car Информация об автомобиле
 * @apiSuccess {Object} [data.contract] Информация о контракте
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {post} /api/requests Создать новую заявку
 * @apiName CreateRequest
 * @apiGroup Requests
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} client_id ID клиента
 * @apiParam {Number} employee_id ID сотрудника
 * @apiParam {Number} car_id ID автомобиля
 * @apiParam {String} date Дата заявки
 * @apiParam {String} [status=НОВАЯ] Статус заявки
 *
 * @apiSuccess {String} status Статус ответа (success)
 * @apiSuccess {String} message Сообщение об успешном создании
 * @apiSuccess {Object} data Данные созданной заявки
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {put} /api/requests/:id Обновить заявку
 * @apiName UpdateRequest
 * @apiGroup Requests
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор заявки
 * @apiParam {Number} [client_id] ID клиента
 * @apiParam {Number} [employee_id] ID сотрудника
 * @apiParam {Number} [car_id] ID автомобиля
 * @apiParam {String} [date] Дата заявки
 * @apiParam {String} [status] Статус заявки
 *
 * @apiSuccess {String} status Статус ответа (success)
 * @apiSuccess {String} message Сообщение об успешном обновлении
 * @apiSuccess {Object} data Данные обновленной заявки
 *
 * @apiUse ErrorResponse
 */

/**
 * @api {delete} /api/requests/:id Удалить заявку
 * @apiName DeleteRequest
 * @apiGroup Requests
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор заявки
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiUse ErrorResponse
 */

module.exports = {
  title: 'Car Tracker API Documentation',
  version: '1.0.0',
  description: 'API для системы отслеживания автомобилей'
};