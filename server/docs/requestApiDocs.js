/**
 * @module docs/requestApiDocs
 * @description Документация API для заявок Car Tracker
 */

/**
 * @api {get} /api/requests Получить все заявки
 * @apiName GetAllRequests
 * @apiGroup Requests
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} status Статус ответа (всегда "success" для успешных запросов)
 * @apiSuccess {Object[]} data Список всех заявок
 * @apiSuccess {Number} data.id Уникальный идентификатор заявки
 * @apiSuccess {Number} data.client_id ID клиента
 * @apiSuccess {Number} data.employee_id ID сотрудника
 * @apiSuccess {Number} data.car_id ID автомобиля
 * @apiSuccess {String} data.date Дата заявки (формат: YYYY-MM-DD)
 * @apiSuccess {String} data.status Статус заявки (НОВАЯ, В РАБОТЕ, ЗАВЕРШЕНА, ОТМЕНЕНА)
 * @apiSuccess {Object} data.client Информация о клиенте
 * @apiSuccess {Object} data.employee Информация о сотруднике
 * @apiSuccess {Object} data.car Информация об автомобиле
 * @apiSuccess {Object} [data.contract] Информация о контракте (если есть)
 * @apiSuccess {String} data.createdAt Дата создания записи
 * @apiSuccess {String} data.updatedAt Дата последнего обновления записи
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
 * @apiSuccess {String} status Статус ответа (всегда "success" для успешных запросов)
 * @apiSuccess {Object} data Информация о заявке
 * @apiSuccess {Number} data.id Уникальный идентификатор заявки
 * @apiSuccess {Number} data.client_id ID клиента
 * @apiSuccess {Number} data.employee_id ID сотрудника
 * @apiSuccess {Number} data.car_id ID автомобиля
 * @apiSuccess {String} data.date Дата заявки (формат: YYYY-MM-DD)
 * @apiSuccess {String} data.status Статус заявки (НОВАЯ, В РАБОТЕ, ЗАВЕРШЕНА, ОТМЕНЕНА)
 * @apiSuccess {Object} data.client Информация о клиенте
 * @apiSuccess {Object} data.employee Информация о сотруднике
 * @apiSuccess {Object} data.car Информация об автомобиле
 * @apiSuccess {Object} [data.contract] Информация о контракте (если есть)
 * @apiSuccess {String} data.createdAt Дата создания записи
 * @apiSuccess {String} data.updatedAt Дата последнего обновления записи
 *
 * @apiError {String} status Статус ответа (всегда "error" для ошибок)
 * @apiError {String} message Сообщение об ошибке
 * @apiError {Object[]} errors Массив объектов с детальной информацией об ошибках
 * @apiError {String} errors.field Название поля с ошибкой
 * @apiError {String} errors.message Сообщение об ошибке для конкретного поля
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
 * @apiParam {String} date Дата заявки (формат: YYYY-MM-DD)
 * @apiParam {String} [status] Статус заявки (по умолчанию: "НОВАЯ")
 *
 * @apiSuccess {String} status Статус ответа (всегда "success" для успешных запросов)
 * @apiSuccess {Object} data Информация о созданной заявке
 * @apiSuccess {Number} data.id Уникальный идентификатор заявки
 * @apiSuccess {Number} data.client_id ID клиента
 * @apiSuccess {Number} data.employee_id ID сотрудника
 * @apiSuccess {Number} data.car_id ID автомобиля
 * @apiSuccess {String} data.date Дата заявки
 * @apiSuccess {String} data.status Статус заявки
 * @apiSuccess {String} data.createdAt Дата создания записи
 * @apiSuccess {String} data.updatedAt Дата последнего обновления записи
 *
 * @apiError {String} status Статус ответа (всегда "error" для ошибок)
 * @apiError {String} message Сообщение об ошибке
 * @apiError {Object[]} errors Массив объектов с детальной информацией об ошибках
 * @apiError {String} errors.field Название поля с ошибкой
 * @apiError {String} errors.message Сообщение об ошибке для конкретного поля
 */

/**
 * @api {put} /api/requests/:id Обновить заявку по ID
 * @apiName UpdateRequest
 * @apiGroup Requests
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Уникальный идентификатор заявки
 * @apiParam {Number} [client_id] ID клиента
 * @apiParam {Number} [employee_id] ID сотрудника
 * @apiParam {Number} [car_id] ID автомобиля
 * @apiParam {String} [date] Дата заявки (формат: YYYY-MM-DD)
 * @apiParam {String} [status] Статус заявки (НОВАЯ, В РАБОТЕ, ЗАВЕРШЕНА, ОТМЕНЕНА)
 *
 * @apiSuccess {String} status Статус ответа (всегда "success" для успешных запросов)
 * @apiSuccess {Object} data Информация об обновленной заявке
 * @apiSuccess {Number} data.id Уникальный идентификатор заявки
 * @apiSuccess {Number} data.client_id ID клиента
 * @apiSuccess {Number} data.employee_id ID сотрудника
 * @apiSuccess {Number} data.car_id ID автомобиля
 * @apiSuccess {String} data.date Дата заявки
 * @apiSuccess {String} data.status Статус заявки
 * @apiSuccess {String} data.createdAt Дата создания записи
 * @apiSuccess {String} data.updatedAt Дата последнего обновления записи
 *
 * @apiError {String} status Статус ответа (всегда "error" для ошибок)
 * @apiError {String} message Сообщение об ошибке
 * @apiError {Object[]} errors Массив объектов с детальной информацией об ошибках
 * @apiError {String} errors.field Название поля с ошибкой
 * @apiError {String} errors.message Сообщение об ошибке для конкретного поля
 */

module.exports = {};