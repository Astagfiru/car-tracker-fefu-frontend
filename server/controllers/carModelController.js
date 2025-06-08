/**
 * @module controllers/carModelController
 * @description Контроллер для управления моделями автомобилей
 */

const { CarModel, Car } = require('../models');

/**
 * @function getAllCarModels
 * @description Получение списка всех моделей автомобилей
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.getAllCarModels = async (req, res, next) => {
  try {
    const include = req.query.include;
    let options = {};
    
    // Если запрошены связанные автомобили
    if (include === 'carModel') {
      options.include = [{ model: Car, as: 'cars' }];
    }
    
    const carModels = await CarModel.findAll(options);
    res.json({
      status: 'success',
      data: carModels
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @function getCarModelById
 * @description Получение модели автомобиля по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.getCarModelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const include = req.query.include;
    let options = { where: { id } };
    
    // Если запрошены связанные автомобили
    if (include === 'carModel') {
      options.include = [{ model: Car, as: 'cars' }];
    }
    
    const carModel = await CarModel.findOne(options);
    
    if (!carModel) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Модель автомобиля не найдена' 
      });
    }
    
    res.json({
      status: 'success',
      data: carModel
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @function createCarModel
 * @description Создание новой модели автомобиля
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.createCarModel = async (req, res, next) => {
  try {
    const {
      brand,
      model,
      year,
      seats,
      doors,
      fuelConsumption,
      additionalInfo,
    } = req.body;

    const carModel = await CarModel.create({
      brand,
      model,
      year,
      seats,
      doors,
      fuel_consumption: fuelConsumption,
      additional_info: additionalInfo ? JSON.stringify(additionalInfo) : null,
    });

    const json = carModel.toJSON();
    try {
      json.additional_info = json.additional_info ? JSON.parse(json.additional_info) : null;
    } catch {
      json.additional_info = null;
    }

    res.status(201).json({ status: 'success', data: json });
  } catch (err) {
    next(err);
  }
};

/**
 * @function updateCarModel
 * @description Обновление данных модели автомобиля по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.updateCarModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      brand,
      model,
      year,
      seats,
      doors,
      fuelConsumption,
      additionalInfo,
    } = req.body;

    const carModel = await CarModel.findByPk(id);
    if (!carModel) {
      return res.status(404).json({ status: 'error', message: 'Модель автомобиля не найдена' });
    }

    await carModel.update({
      brand,
      model,
      year,
      seats,
      doors,
      fuel_consumption: fuelConsumption,
      additional_info: additionalInfo ? JSON.stringify(additionalInfo) : null,
    });

    const json = carModel.toJSON();
    try {
      json.additional_info = json.additional_info ? JSON.parse(json.additional_info) : null;
    } catch {
      json.additional_info = null;
    }

    res.json({ status: 'success', data: json });
  } catch (err) {
    next(err);
  }
};


/**
 * @function deleteCarModel
 * @description Удаление модели автомобиля по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.deleteCarModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carModel = await CarModel.findByPk(id);
    
    if (!carModel) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Модель автомобиля не найдена' 
      });
    }
    
    await carModel.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};