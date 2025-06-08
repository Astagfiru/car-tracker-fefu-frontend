// controllers/contractsController.js

const { Contract, Application, Client, Employee, Car } = require('../models');

/**
 * GET /contracts
 * Получить список всех контрактов вместе с данными по заявке (и, при желании, по связанным клиенту/сотруднику/автомобилю)
 */
exports.getAllContracts = async (req, res, next) => {
  try {
    const contracts = await Contract.findAll({
      include: [
        {
          model: Application,
          as: 'application',
          attributes: [
            'id',
            'application_date',
            'status',
            // дополнительные поля заявки, если нужны
          ],
          include: [
            {
              model: Client,
              as: 'client',
              attributes: ['id', 'last_name', 'first_name', 'phone'],
            },
            {
              model: Employee,
              as: 'employee',
              attributes: ['id', 'last_name', 'first_name', 'position'],
            },
            {
              model: Car,
              as: 'car',
              attributes: ['id', 'vin', 'price'],
            },
          ],
        },
      ],
    });

    return res.status(200).json({ data: contracts });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /contracts/:id
 * Получить один контракт по его ID (с информацией по заявке и вложенными связями)
 */
exports.getContractById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contract = await Contract.findByPk(id, {
      include: [
        {
          model: Application,
          as: 'application',
          attributes: [
            'id',
            'application_date',
            'status',
            // дополнительные поля заявки
          ],
          include: [
            {
              model: Client,
              as: 'client',
              attributes: ['id', 'last_name', 'first_name', 'phone'],
            },
            {
              model: Employee,
              as: 'employee',
              attributes: ['id', 'last_name', 'first_name', 'position'],
            },
            {
              model: Car,
              as: 'car',
              attributes: ['id', 'vin', 'price'],
            },
          ],
        },
      ],
    });

    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    return res.status(200).json({ data: contract });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /contracts
 * Создать новый контракт.
 *
 * Ожидает JSON-body со свойствами:
 *   - application_id (integer, обязателен, должен ссылаться на существующую заявку)
 *   - signing_date (строка «YYYY-MM-DD», обязателен)
 *   - contract_number (строка, обязателен, уникален)
 *   - amount (дек–в, обязателен, ≥ 0.01)
 */
exports.createContract = async (req, res, next) => {
  const { application_id, signing_date, contract_number, amount } = req.body;

  try {
    // Проверяем, что заявка существует:
    const application = await Application.findByPk(application_id);
    if (!application) {
      return res
        .status(400)
        .json({ error: 'Invalid application_id: application does not exist.' });
    }

    // Проверяем, что по этой заявке ещё нет контракта (так как application_id — unique):
    const existing = await Contract.findOne({ where: { application_id } });
    if (existing) {
      return res
        .status(409)
        .json({ error: 'Contract for this application already exists.' });
    }

    const newContract = await Contract.create({
      application_id,
      signing_date,
      contract_number,
      amount,
    });

    // Подгрузим вложенные данные по заявке сразу в ответ:
    await newContract.reload({
      include: [
        {
          model: Application,
          as: 'application',
          attributes: ['id', 'application_date', 'status'],
          include: [
            { model: Client, as: 'client', attributes: ['id', 'last_name', 'first_name'] },
            { model: Employee, as: 'employee', attributes: ['id', 'last_name', 'first_name'] },
            { model: Car, as: 'car', attributes: ['id', 'vin', 'price'] },
          ],
        },
      ],
    });

    return res.status(201).json({ data: newContract });
  } catch (err) {
    // Если ошибка валидации или уникальности полей:
    if (
      err.name === 'SequelizeValidationError' ||
      err.name === 'SequelizeUniqueConstraintError'
    ) {
      const messages = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: messages });
    }
    next(err);
  }
};

/**
 * PUT /contracts/:id
 * Обновить поля существующего контракта.
 *
 * В теле можно передать любое из:
 *   - signing_date
 *   - contract_number
 *   - amount
 *   - (опционально) application_id (если необходимо переназначить на другую заявку)
 */
exports.updateContract = async (req, res, next) => {
  const { id } = req.params;
  const { application_id, signing_date, contract_number, amount } = req.body;

  try {
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    // Если передан новый application_id, проверяем, что:
    // 1) существует такая заявка, 2) у неё ещё нет контракта (unique constraint).
    if (application_id && application_id !== contract.application_id) {
      const application = await Application.findByPk(application_id);
      if (!application) {
        return res
          .status(400)
          .json({ error: 'Invalid application_id: application does not exist.' });
      }

      const already = await Contract.findOne({ where: { application_id } });
      if (already) {
        return res
          .status(409)
          .json({ error: 'Another contract for this application already exists.' });
      }

      contract.application_id = application_id;
    }

    if (signing_date !== undefined) contract.signing_date = signing_date;
    if (contract_number !== undefined) contract.contract_number = contract_number;
    if (amount !== undefined) contract.amount = amount;

    await contract.save();

    // Перегружаем вложенные связи:
    await contract.reload({
      include: [
        {
          model: Application,
          as: 'application',
          attributes: ['id', 'application_date', 'status'],
          include: [
            { model: Client, as: 'client', attributes: ['id', 'last_name', 'first_name'] },
            { model: Employee, as: 'employee', attributes: ['id', 'last_name', 'first_name'] },
            { model: Car, as: 'car', attributes: ['id', 'vin', 'price'] },
          ],
        },
      ],
    });

    return res.status(200).json({ data: contract });
  } catch (err) {
    if (
      err.name === 'SequelizeValidationError' ||
      err.name === 'SequelizeUniqueConstraintError'
    ) {
      const messages = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: messages });
    }
    next(err);
  }
};

/**
 * DELETE /contracts/:id
 * Удалить контракт по ID
 */
exports.deleteContract = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    await contract.destroy();
    return res.status(204).send(); // No Content
  } catch (err) {
    next(err);
  }
};
