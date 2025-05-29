/**
 * @module controllers/carController
 * @description Контроллер для управления автомобилями
 */

const { Car, CarModel } = require('../models');

/**
 * @function getAllCars
 * @description Получение списка всех автомобилей
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.getAllCars = async (req, res, next) => {
  try {
    const cars = await Car.findAll({
      include: [{ model: CarModel, as: 'model' }]
    });

    const parsedCars = cars.map(car => {
      const carJSON = car.toJSON();
      try {
        carJSON.model.additional_info = JSON.parse(carJSON.model.additional_info);
      } catch (e) {
        carJSON.model.additional_info = null;
      }
      return carJSON;
    });

    res.json({
      status: 'success',
      data: parsedCars
    });
  } catch (err) {
    next(err);
  }
};


/**
 * @function getCarById
 * @description Получение автомобиля по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findOne({
      where: { id },
      include: [{ model: CarModel, as: 'model' }]
    });

    if (!car) {
      return res.status(404).json({
        status: 'error',
        message: 'Автомобиль не найден'
      });
    }

    const carJSON = car.toJSON();

    try {
      carJSON.model.additional_info = JSON.parse(carJSON.model.additional_info);
    } catch (e) {
      carJSON.model.additional_info = null;
    }

    res.json({
      status: 'success',
      data: carJSON
    });
  } catch (err) {
    next(err);
  }
};


/**
 * @function createCar
 * @description Создание нового автомобиля
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.createCar = async (req, res, next) => {
  try {
    const { model_id, available, vin, mileage, price } = req.body;
    
    // Проверяем существование модели
    const carModel = await CarModel.findByPk(model_id);
    if (!carModel) {
      return res.status(404).json({
        status: 'error',
        message: 'Указанная модель автомобиля не найдена'
      });
    }
    
    const car = await Car.create({ 
      model_id, 
      available, 
      vin, 
      mileage, 
      price 
    });
    
    res.status(201).json({
      status: 'success',
      data: car
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @function updateCar
 * @description Обновление данных автомобиля по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { model_id, available, vin, mileage, price } = req.body;
    
    const car = await Car.findByPk(id);
    
    if (!car) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Автомобиль не найден' 
      });
    }
    
    // Если меняется модель, проверяем её существование
    if (model_id && model_id !== car.model_id) {
      const carModel = await CarModel.findByPk(model_id);
      if (!carModel) {
        return res.status(404).json({
          status: 'error',
          message: 'Указанная модель автомобиля не найдена'
        });
      }
    }
    
    await car.update({ 
      model_id, 
      available, 
      vin, 
      mileage, 
      price 
    });
    
    res.json({
      status: 'success',
      data: car
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @function deleteCar
 * @description Удаление автомобиля по ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);
    
    if (!car) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Автомобиль не найден' 
      });
    }
    
    await car.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};