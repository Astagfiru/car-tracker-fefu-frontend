const { User } = require('../models');
const bcrypt = require('bcrypt');

/**
 * Авторизация пользователя
 * @param {Object} req - запрос с телом { login, password }
 * @param {Object} res - ответ сервера
 * @param {Function} next - передача ошибок в middleware
 */
exports.login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    // Проверка наличия полей
    if (!login || !password) {
      return res.status(400).json({ status: 'error', message: 'Логин и пароль обязательны' });
    }

    // Поиск пользователя
    const user = await User.findOne({ where: { login } });
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Неверный логин или пароль' });
    }

    // Сравнение паролей
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 'error', message: 'Неверный логин или пароль' });
    }

    // Успешная авторизация
    res.status(200).json({ status: 'success', message: 'Авторизация успешна' });
  } catch (err) {
    next(err);
  }
};