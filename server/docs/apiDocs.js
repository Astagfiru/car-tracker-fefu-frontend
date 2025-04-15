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

module.exports = {
  title: 'Car Tracker API Documentation',
  version: '1.0.0',
  description: 'API для системы отслеживания автомобилей'
};