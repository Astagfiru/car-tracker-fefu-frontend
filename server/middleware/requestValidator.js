/**
 * @module middleware/requestValidator
 * @description Валидация данных для заявок
 */

/**
 * @function validateCreateRequest
 * @description Валидация данных при создании заявки
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
exports.validateCreateRequest = (req, res, next) => {
  const { client_id, employee_id, car_id, date, status } = req.body;
  const errors = [];

  // Проверка обязательных полей
  if (!client_id) {
    errors.push({ field: 'client_id', message: 'ID клиента обязателен' });
  } else if (!Number.isInteger(Number(client_id)) || Number(client_id) <= 0) {
    errors.push({ field: 'client_id', message: 'ID клиента должен быть положительным целым числом' });
  }

  if (!employee_id) {
    errors.push({ field: 'employee_id', message: 'ID сотрудника обязателен' });
  } else if (!Number.isInteger(Number(employee_id)) || Number(employee_id) <= 0) {
    errors.push({ field: 'employee_id', message: 'ID сотрудника должен быть положительным целым числом' });
  }

  if (!car_id) {
    errors.push({ field: 'car_id', message: 'ID автомобиля обязателен' });
  } else if (!Number.isInteger(Number(car_id)) || Number(car_id) <= 0) {
    errors.push({ field: 'car_id', message: 'ID автомобиля должен быть положительным целым числом' });
  }

  if (!date) {
    errors.push({ field: 'date', message: 'Дата заявки обязательна' });
  } else {
    // Проверка формата даты (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      errors.push({ field: 'date', message: 'Дата должна быть в формате YYYY-MM-DD' });
    } else {
      // Проверка валидности даты
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        errors.push({ field: 'date', message: 'Указана некорректная дата' });
      }
    }
  }

  // Проверка статуса, если он указан
  if (status !== undefined) {
    const validStatuses = ['НОВАЯ', 'В РАБОТЕ', 'ЗАВЕРШЕНА', 'ОТМЕНЕНА'];
    if (!validStatuses.includes(status)) {
      errors.push({ 
        field: 'status', 
        message: `Статус должен быть одним из: ${validStatuses.join(', ')}` 
      });
    }
  }

  // Если есть ошибки, возвращаем их
  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Ошибка валидации данных',
      errors: errors
    });
  }

  next();
};

/**
 * @function validateUpdateRequest
 * @description Валидация данных при обновлении заявки
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
exports.validateUpdateRequest = (req, res, next) => {
  const { client_id, employee_id, car_id, date, status } = req.body;
  const errors = [];

  // Проверка ID в параметрах запроса
  const { id } = req.params;
  if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
    errors.push({ field: 'id', message: 'ID заявки должен быть положительным целым числом' });
  }

  // Проверка полей, если они указаны
  if (client_id !== undefined) {
    if (!Number.isInteger(Number(client_id)) || Number(client_id) <= 0) {
      errors.push({ field: 'client_id', message: 'ID клиента должен быть положительным целым числом' });
    }
  }

  if (employee_id !== undefined) {
    if (!Number.isInteger(Number(employee_id)) || Number(employee_id) <= 0) {
      errors.push({ field: 'employee_id', message: 'ID сотрудника должен быть положительным целым числом' });
    }
  }

  if (car_id !== undefined) {
    if (!Number.isInteger(Number(car_id)) || Number(car_id) <= 0) {
      errors.push({ field: 'car_id', message: 'ID автомобиля должен быть положительным целым числом' });
    }
  }

  if (date !== undefined) {
    // Проверка формата даты (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      errors.push({ field: 'date', message: 'Дата должна быть в формате YYYY-MM-DD' });
    } else {
      // Проверка валидности даты
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        errors.push({ field: 'date', message: 'Указана некорректная дата' });
      }
    }
  }

  // Проверка статуса, если он указан
  if (status !== undefined) {
    const validStatuses = ['НОВАЯ', 'В РАБОТЕ', 'ЗАВЕРШЕНА', 'ОТМЕНЕНА'];
    if (!validStatuses.includes(status)) {
      errors.push({ 
        field: 'status', 
        message: `Статус должен быть одним из: ${validStatuses.join(', ')}` 
      });
    }
  }

  // Если есть ошибки, возвращаем их
  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Ошибка валидации данных',
      errors: errors
    });
  }

  next();
};