/**
 * @module middleware/errorHandler
 * @description Централизованная обработка ошибок для приложения
 */

/**
 * @function errorHandler
 * @description Middleware для обработки ошибок
 * @param {Error} err - Объект ошибки
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  const errorResponse = {
    status: 'error',
    message: err.message || 'Внутренняя ошибка сервера',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  };
  
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    errorResponse.message = 'Ошибка валидации данных';
    errorResponse.errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json(errorResponse);
  }
  
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;