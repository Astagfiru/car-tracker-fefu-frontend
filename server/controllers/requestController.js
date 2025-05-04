/**
 * @module controllers/requestController
 * @description Контроллер для управления заявками
 */

const { Request, Client, Employee, Car, Contract, sequelize } = require('../models');
const { ValidationError } = require('sequelize');

/**
 * @function getAllRequests
 * @description Получение списка всех заявок
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.getAllRequests = async (req, res, next) => {
  try {
    // Добавляем возможность фильтрации по статусу
    const { status } = req.query;
    const whereClause = {};
    
    if (status) {
      const validStatuses = ['НОВАЯ', 'В РАБОТЕ', 'ЗАВЕРШЕНА', 'ОТМЕНЕНА'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          status: 'error',
          message: 'Некорректный статус для фильтрации',
          errors: [{ field: 'status', message: `Статус должен быть одним из: ${validStatuses.join(', ')}` }]
        });
      }
      whereClause.status = status;
    }
    
    const requests = await Request.findAll({
      where: whereClause,
      include: [
        { model: Client, as: 'client' },
        { model: Employee, as: 'employee' },
        { model: Car, as: 'car' },
        { model: Contract, as: 'contract' }
      ],
      order: [['updatedAt', 'DESC']] // Сортировка по дате обновления (сначала новые)
    });
    
    res.json({
      status: 'success',
      count: requests.length,
      data: requests
    });
  } catch (err) {
    console.error('Ошибка при получении списка заявок:', err);
    res.status(500).json({
      status: 'error',
      message: 'Внутренняя ошибка сервера при получении списка заявок',
      errors: [{ field: null, message: err.message }]
    });
  }
};

/**
 * @function getRequestById
 * @description Получение заявки по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.getRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Проверка валидности ID
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Некорректный ID заявки',
        errors: [{ field: 'id', message: 'ID заявки должен быть положительным числом' }]
      });
    }
    
    const request = await Request.findByPk(id, {
      include: [
        { model: Client, as: 'client' },
        { model: Employee, as: 'employee' },
        { model: Car, as: 'car' },
        { model: Contract, as: 'contract' }
      ]
    });
    
    if (!request) {
      return res.status(404).json({
        status: 'error',
        message: 'Заявка не найдена',
        errors: [{ field: 'id', message: `Заявка с ID ${id} не существует` }]
      });
    }
    
    res.json({
      status: 'success',
      data: request
    });
  } catch (err) {
    console.error('Ошибка при получении заявки:', err);
    res.status(500).json({
      status: 'error',
      message: 'Внутренняя ошибка сервера при получении заявки',
      errors: [{ field: null, message: err.message }]
    });
  }
};

/**
 * @function createRequest
 * @description Создание новой заявки
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.createRequest = async (req, res, next) => {
  // Начинаем транзакцию для обеспечения атомарности операций
  const transaction = await sequelize.transaction();
  
  try {
    const { client_id, employee_id, car_id, date, status } = req.body;
    
    // Проверка существования клиента
    const client = await Client.findByPk(client_id, { transaction });
    if (!client) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Клиент не найден',
        errors: [{ field: 'client_id', message: `Клиент с ID ${client_id} не существует` }]
      });
    }
    
    // Проверка существования сотрудника
    const employee = await Employee.findByPk(employee_id, { transaction });
    if (!employee) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Сотрудник не найден',
        errors: [{ field: 'employee_id', message: `Сотрудник с ID ${employee_id} не существует` }]
      });
    }
    
    // Проверка существования автомобиля с блокировкой строки для предотвращения race condition
    const car = await Car.findByPk(car_id, { 
      transaction,
      lock: transaction.LOCK.UPDATE
    });
    
    if (!car) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Автомобиль не найден',
        errors: [{ field: 'car_id', message: `Автомобиль с ID ${car_id} не существует` }]
      });
    }
    
    // Проверка доступности автомобиля
    if (!car.available) {
      await transaction.rollback();
      return res.status(400).json({
        status: 'error',
        message: 'Автомобиль недоступен',
        errors: [{ field: 'car_id', message: `Автомобиль с ID ${car_id} в данный момент недоступен` }]
      });
    }
    
    // Проверка валидности статуса
    const validStatuses = ['НОВАЯ', 'В РАБОТЕ', 'ЗАВЕРШЕНА', 'ОТМЕНЕНА'];
    const requestStatus = status || 'НОВАЯ'; // По умолчанию статус "НОВАЯ"
    
    if (status && !validStatuses.includes(status)) {
      await transaction.rollback();
      return res.status(400).json({
        status: 'error',
        message: 'Некорректный статус заявки',
        errors: [{ field: 'status', message: `Статус должен быть одним из: ${validStatuses.join(', ')}` }]
      });
    }
    
    // Создаем заявку
    const request = await Request.create({ 
      client_id, 
      employee_id, 
      car_id, 
      date, 
      status: requestStatus
    }, { transaction });
    
    // Обновляем статус доступности автомобиля
    await car.update({ available: false }, { transaction });
    
    // Фиксируем транзакцию
    await transaction.commit();
    
    // Получаем полные данные заявки со связанными сущностями
    const createdRequest = await Request.findByPk(request.id, {
      include: [
        { model: Client, as: 'client' },
        { model: Employee, as: 'employee' },
        { model: Car, as: 'car' }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Заявка успешно создана',
      data: createdRequest
    });
  } catch (err) {
    // Откатываем транзакцию в случае ошибки
    await transaction.rollback();
    
    console.error('Ошибка при создании заявки:', err);
    
    // Обработка ошибок валидации Sequelize
    if (err instanceof ValidationError) {
      return res.status(400).json({
        status: 'error',
        message: 'Ошибка валидации данных',
        errors: err.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    
    // Общая обработка ошибок
    res.status(500).json({
      status: 'error',
      message: 'Внутренняя ошибка сервера при создании заявки',
      errors: [{ field: null, message: err.message }]
    });
  }
};

/**
 * @function updateRequest
 * @description Обновление заявки по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.updateRequest = async (req, res, next) => {
  // Начинаем транзакцию для обеспечения атомарности операций
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { client_id, employee_id, car_id, date, status } = req.body;
    
    // Проверка валидности ID
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      await transaction.rollback();
      return res.status(400).json({
        status: 'error',
        message: 'Некорректный ID заявки',
        errors: [{ field: 'id', message: 'ID заявки должен быть положительным числом' }]
      });
    }
    
    // Получаем заявку с блокировкой строки
    const request = await Request.findByPk(id, { 
      transaction,
      lock: transaction.LOCK.UPDATE
    });
    
    if (!request) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Заявка не найдена',
        errors: [{ field: 'id', message: `Заявка с ID ${id} не существует` }]
      });
    }
    
    // Проверка существования клиента, если ID клиента изменился
    if (client_id !== undefined && client_id !== request.client_id) {
      const client = await Client.findByPk(client_id, { transaction });
      if (!client) {
        await transaction.rollback();
        return res.status(404).json({
          status: 'error',
          message: 'Клиент не найден',
          errors: [{ field: 'client_id', message: `Клиент с ID ${client_id} не существует` }]
        });
      }
    }
    
    // Проверка существования сотрудника, если ID сотрудника изменился
    if (employee_id !== undefined && employee_id !== request.employee_id) {
      const employee = await Employee.findByPk(employee_id, { transaction });
      if (!employee) {
        await transaction.rollback();
        return res.status(404).json({
          status: 'error',
          message: 'Сотрудник не найден',
          errors: [{ field: 'employee_id', message: `Сотрудник с ID ${employee_id} не существует` }]
        });
      }
    }
    
    // Проверка валидности статуса, если он указан
    if (status !== undefined) {
      const validStatuses = ['НОВАЯ', 'В РАБОТЕ', 'ЗАВЕРШЕНА', 'ОТМЕНЕНА'];
      if (!validStatuses.includes(status)) {
        await transaction.rollback();
        return res.status(400).json({
          status: 'error',
          message: 'Некорректный статус заявки',
          errors: [{ field: 'status', message: `Статус должен быть одним из: ${validStatuses.join(', ')}` }]
        });
      }
    }
    
    // Обработка смены автомобиля
    if (car_id !== undefined && car_id !== request.car_id) {
      // Получаем новый автомобиль с блокировкой строки
      const newCar = await Car.findByPk(car_id, { 
        transaction,
        lock: transaction.LOCK.UPDATE
      });
      
      if (!newCar) {
        await transaction.rollback();
        return res.status(404).json({
          status: 'error',
          message: 'Автомобиль не найден',
          errors: [{ field: 'car_id', message: `Автомобиль с ID ${car_id} не существует` }]
        });
      }
      
      // Проверка доступности нового автомобиля
      if (!newCar.available) {
        await transaction.rollback();
        return res.status(400).json({
          status: 'error',
          message: 'Новый автомобиль недоступен',
          errors: [{ field: 'car_id', message: `Автомобиль с ID ${car_id} в данный момент недоступен` }]
        });
      }
      
      // Освобождаем старый автомобиль
      const oldCar = await Car.findByPk(request.car_id, { 
        transaction,
        lock: transaction.LOCK.UPDATE
      });
      
      if (oldCar) {
        await oldCar.update({ available: true }, { transaction });
      }
      
      // Занимаем новый автомобиль
      await newCar.update({ available: false }, { transaction });
    }
    
    // Если статус меняется на "ОТМЕНЕНА" или "ЗАВЕРШЕНА", освобождаем автомобиль
    if ((status === 'ОТМЕНЕНА' || status === 'ЗАВЕРШЕНА') && 
        request.status !== 'ОТМЕНЕНА' && request.status !== 'ЗАВЕРШЕНА') {
      const car = await Car.findByPk(request.car_id, { 
        transaction,
        lock: transaction.LOCK.UPDATE
      });
      
      if (car) {
        await car.update({ available: true }, { transaction });
      }
    }
    
    // Обновляем заявку
    const updateData = {};
    if (client_id !== undefined) updateData.client_id = client_id;
    if (employee_id !== undefined) updateData.employee_id = employee_id;
    if (car_id !== undefined) updateData.car_id = car_id;
    if (date !== undefined) updateData.date = date;
    if (status !== undefined) updateData.status = status;
    
    await request.update(updateData, { transaction });
    
    // Фиксируем транзакцию
    await transaction.commit();
    
    // Получаем обновленные данные заявки со связанными сущностями
    const updatedRequest = await Request.findByPk(id, {
      include: [
        { model: Client, as: 'client' },
        { model: Employee, as: 'employee' },
        { model: Car, as: 'car' },
        { model: Contract, as: 'contract' }
      ]
    });
    
    res.json({
      status: 'success',
      message: 'Заявка успешно обновлена',
      data: updatedRequest
    });
  } catch (err) {
    // Откатываем транзакцию в случае ошибки
    await transaction.rollback();
    
    console.error('Ошибка при обновлении заявки:', err);
    
    // Обработка ошибок валидации Sequelize
    if (err instanceof ValidationError) {
      return res.status(400).json({
        status: 'error',
        message: 'Ошибка валидации данных',
        errors: err.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    
    // Общая обработка ошибок
    res.status(500).json({
      status: 'error',
      message: 'Внутренняя ошибка сервера при обновлении заявки',
      errors: [{ field: null, message: err.message }]
    });
  }
};

/**
 * @function deleteRequest
 * @description Удаление заявки по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.deleteRequest = async (req, res, next) => {
  // Начинаем транзакцию для обеспечения атомарности операций
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    
    // Проверка валидности ID
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      await transaction.rollback();
      return res.status(400).json({
        status: 'error',
        message: 'Некорректный ID заявки',
        errors: [{ field: 'id', message: 'ID заявки должен быть положительным числом' }]
      });
    }
    
    // Получаем заявку с блокировкой строки
    const request = await Request.findByPk(id, { 
      transaction,
      lock: transaction.LOCK.UPDATE
    });
    
    if (!request) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Заявка не найдена',
        errors: [{ field: 'id', message: `Заявка с ID ${id} не существует` }]
      });
    }
    
    // Если заявка не в статусе "ОТМЕНЕНА" или "ЗАВЕРШЕНА", освобождаем автомобиль
    if (request.status !== 'ОТМЕНЕНА' && request.status !== 'ЗАВЕРШЕНА') {
      const car = await Car.findByPk(request.car_id, { 
        transaction,
        lock: transaction.LOCK.UPDATE
      });
      
      if (car) {
        await car.update({ available: true }, { transaction });
      }
    }
    
    // Удаляем заявку
    await request.destroy({ transaction });
    
    // Фиксируем транзакцию
    await transaction.commit();
    
    res.status(204).end();
  } catch (err) {
    // Откатываем транзакцию в случае ошибки
    await transaction.rollback();
    
    console.error('Ошибка при удалении заявки:', err);
    
    // Общая обработка ошибок
    res.status(500).json({
      status: 'error',
      message: 'Внутренняя ошибка сервера при удалении заявки',
      errors: [{ field: null, message: err.message }]
    });
  }
};