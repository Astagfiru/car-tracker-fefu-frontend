/**
 * @module controllers/applicationController
 * @description Контроллер для управления заявками
 */

const { Application, Client, Employee, Car, Contract, CarModel, sequelize  } = require('../models');
const { ValidationError, Op } = require('sequelize');

/**
 * @function getAllApplications
 * @description Получение списка всех заявок с полными объектами клиента, сотрудника и автомобиля
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
// Форматируем дату в строку "DD.MM.YYYY HH:mm"
const formatDate = dt =>
  new Date(dt).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

exports.getAllApplications = async (req, res, next) => {
  try {
    const { status } = req.query;
    const whereClause = {};
    if (status) {
      const validStatuses = ['В обработке', 'Выполнено', 'Отменено'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ /* ... */ });
      }
      whereClause.status = { [Op.eq]: status };
    }

    const applications = await Application.findAll({
      where: whereClause,
      include: [
        { model: Client,   as: 'client',   attributes: ['id','last_name','first_name','phone','email'] },
        { model: Employee, as: 'employee', attributes: ['id','last_name','first_name','position'] },
        {
          model: Car,
          as: 'car',
          attributes: ['id','vin','price','model_id'],
          include: [
            {
              model: CarModel,
              as: 'model',           
              attributes: [
                'id', 'brand', 'model', 'seats',
                'doors', 'year', 'fuel_consumption', 'additional_info'
              ]
            }
          ]
        },
        { model: Contract, as: 'contract', attributes: ['id','contract_number','signing_date','amount'] }
      ],
      order: [['updatedAt', 'DESC']]
    });

    const formatted = applications.map(app => ({
      id:         app.id,
      application_date:       app.application_date,
      status:     app.status,
      createdAt:  formatDate(app.createdAt),
      updatedAt:  formatDate(app.updatedAt),

      client:   app.client,
      employee: app.employee,

      car: {
        id:     app.car.id,
        vin:    app.car.vin,
        price:  parseFloat(app.car.price),
        model: {
          id:               app.car.model.id,
          brand:            app.car.model.brand,
          model:            app.car.model.model,
          seats:            app.car.model.seats,
          doors:            app.car.model.doors,
          year:             app.car.model.year,
          fuel_consumption: app.car.model.fuel_consumption,
          additional_info:  JSON.parse(app.car.model.additional_info)
        }
      },

      contract: app.contract
        ? { ...app.contract.get(), amount: parseFloat(app.contract.amount) }
        : null
    }));

    res.json({ status: 'success', count: formatted.length, data: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ /* ... */ });
  }
};

exports.getApplicationById = async (req, res, next) => {
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

    const app = await Application.findByPk(id, {
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['id','last_name','first_name','phone','email']
        },
        {
          model: Employee,
          as: 'employee',
          attributes: ['id','last_name','first_name','position']
        },
        {
          model: Car,
          as: 'car',
          attributes: ['id','vin','price','model_id'],
          include: [
            {
              model: CarModel,
              as: 'model',
              attributes: [
                'id','brand','model','seats',
                'doors','year','fuel_consumption','additional_info'
              ]
            }
          ]
        },
        {
          model: Contract,
          as: 'contract',
          attributes: ['id','contract_number','signing_date','amount']
        }
      ]
    });

    if (!app) {
      return res.status(404).json({
        status: 'error',
        message: 'Заявка не найдена',
        errors: [{ field: 'id', message: `Заявка с ID ${id} не существует` }]
      });
    }

    // Формируем красивый ответ
    const formatted = {
      id:        app.id,
      application_date:      app.application_date,
      status:    app.status,
      createdAt: formatDate(app.createdAt),
      updatedAt: formatDate(app.updatedAt),

      client:   app.client,
      employee: app.employee,

      car: {
        id:    app.car.id,
        vin:   app.car.vin,
        price: parseFloat(app.car.price),
        model: {
          id:               app.car.model.id,
          brand:            app.car.model.brand,
          model:            app.car.model.model,
          seats:            app.car.model.seats,
          doors:            app.car.model.doors,
          year:             app.car.model.year,
          fuel_consumption: app.car.model.fuel_consumption,
          additional_info:  JSON.parse(app.car.model.additional_info)
        }
      },

      contract: app.contract
        ? {
            id:              app.contract.id,
            contract_number: app.contract.contract_number,
            signing_date:    app.contract.signing_date,
            amount:          parseFloat(app.contract.amount)
          }
        : null
    };

    res.json({
      status: 'success',
      data:   formatted
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
 * @function createApplication
 * @description Создание новой заявки
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.createApplication = async (req, res, next) => {
  // Начинаем транзакцию для обеспечения атомарности операций
  const transaction = await sequelize.transaction();
  
  try {
    const { client_id, employee_id, car_id, application_date, status } = req.body;
    
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
    if (!car.in_stock) {
      await transaction.rollback();
      return res.status(400).json({
        status: 'error',
        message: 'Автомобиль недоступен',
        errors: [{ field: 'car_id', message: `Автомобиль с ID ${car_id} в данный момент недоступен` }]
      });
    }
    
    // Проверка валидности статуса
    const validStatuses = ['В обработке', 'Выполнено', 'Отменено'];
    const applicationStatus = status || 'В обработке'; // По умолчанию статус "В обработке"
    
    if (status && !validStatuses.includes(status)) {
      await transaction.rollback();
      return res.status(400).json({
        status: 'error',
        message: 'Некорректный статус заявки',
        errors: [{ field: 'status', message: `Статус должен быть одним из: ${validStatuses.join(', ')}` }]
      });
    }
    
    // Создаем заявку
    const application = await Application.create({ 
      client_id, 
      employee_id, 
      car_id, 
      application_date, 
      status: applicationStatus
    }, { transaction });
    
    // Обновляем статус доступности автомобиля
    await car.update({ in_stock: false }, { transaction });
    
    // Фиксируем транзакцию
    await transaction.commit();
    
    // Получаем полные данные заявки со связанными сущностями
    const createdApplication = await Application.findByPk(application.id, {
      include: [
        { model: Client, as: 'client' },
        { model: Employee, as: 'employee' },
        { model: Car, as: 'car' }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Заявка успешно создана',
      data: createdApplication
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
 * @function updateApplication
 * @description Обновление заявки по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.updateApplication = async (req, res, next) => {
  // Начинаем транзакцию для обеспечения атомарности операций
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { client_id, employee_id, car_id, application_date, status } = req.body;
    
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
    const application = await Application.findByPk(id, { 
      transaction,
      lock: transaction.LOCK.UPDATE
    });
    
    if (!application) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Заявка не найдена',
        errors: [{ field: 'id', message: `Заявка с ID ${id} не существует` }]
      });
    }
    
    // Проверка существования клиента, если ID клиента изменился
    if (client_id !== undefined && client_id !== application.client_id) {
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
    if (employee_id !== undefined && employee_id !== application.employee_id) {
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
      const validStatuses = ['В обработке', 'Выполнено', 'Отменено'];
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
    if (car_id !== undefined && car_id !== application.car_id) {
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
      const oldCar = await Car.findByPk(application.car_id, { 
        transaction,
        lock: transaction.LOCK.UPDATE
      });
      
      if (oldCar) {
        await oldCar.update({ in_stock: true }, { transaction });
      }
      
      // Занимаем новый автомобиль
      await newCar.update({ in_stock: false }, { transaction });
    }
    
    // Если статус меняется на "Отменено" или "Выполнено", освобождаем автомобиль
    if ((status === 'Отменено' || status === 'Выполнено') && 
        application.status !== 'Отменено' && application.status !== 'Выполнено') {
      const car = await Car.findByPk(application.car_id, { 
        transaction,
        lock: transaction.LOCK.UPDATE
      });
      
      if (car) {
        await car.update({ in_stock: true }, { transaction });
      }
    }
    
    // Обновляем заявку
    const updateData = {};
    if (client_id !== undefined) updateData.client_id = client_id;
    if (employee_id !== undefined) updateData.employee_id = employee_id;
    if (car_id !== undefined) updateData.car_id = car_id;
    if (application_date !== undefined) updateData.date = application_date;
    if (status !== undefined) updateData.status = status;
    
    await application.update(updateData, { transaction });
    
    // Фиксируем транзакцию
    await transaction.commit();
    
    // Получаем обновленные данные заявки со связанными сущностями
    const updatedApplication = await Application.findByPk(id, {
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
      data: updatedApplication
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
 * @function deleteApplication
 * @description Удаление заявки по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.deleteApplication = async (req, res, next) => {
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
    const application = await Application.findByPk(id, { 
      transaction,
      lock: transaction.LOCK.UPDATE
    });
    
    if (!application) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Заявка не найдена',
        errors: [{ field: 'id', message: `Заявка с ID ${id} не существует` }]
      });
    }
    
    // Если заявка не в статусе "Отменено" или "Выполнено", освобождаем автомобиль
    if (application.status !== 'Отменено' && application.status !== 'Выполнено') {
      const car = await Car.findByPk(application.car_id, { 
        transaction,
        lock: transaction.LOCK.UPDATE
      });
      
      if (car) {
        await car.update({ in_stock: true }, { transaction });
      }
    }
    
    // Удаляем заявку
    await application.destroy({ transaction });
    
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