'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Функция для безопасного переименования колонки
    const safeRenameColumn = async (tableName, oldColumnName, newColumnName) => {
      try {
        // Проверяем существование старой колонки
        const tableDescription = await queryInterface.describeTable(tableName);
        if (tableDescription[oldColumnName]) {
          await queryInterface.renameColumn(tableName, oldColumnName, newColumnName);
          console.log(`Колонка ${oldColumnName} в таблице ${tableName} успешно переименована в ${newColumnName}`);
        } else {
          console.log(`Колонка ${oldColumnName} в таблице ${tableName} не существует или уже переименована`);
        }
      } catch (error) {
        console.error(`Ошибка при переименовании колонки ${oldColumnName} в таблице ${tableName}:`, error);
      }
    };

    // Функция для безопасного переименования таблицы
    const safeRenameTable = async (oldTableName, newTableName) => {
      try {
        // Проверяем существование старой таблицы
        const tables = await queryInterface.showAllTables();
        if (tables.includes(oldTableName)) {
          await queryInterface.renameTable(oldTableName, newTableName);
          console.log(`Таблица ${oldTableName} успешно переименована в ${newTableName}`);
        } else {
          console.log(`Таблица ${oldTableName} не существует или уже переименована`);
        }
      } catch (error) {
        console.error(`Ошибка при переименовании таблицы ${oldTableName}:`, error);
      }
    };

    // 1. Изменение таблицы clients
    await safeRenameColumn('clients', 'surname', 'last_name');
    await safeRenameColumn('clients', 'name', 'first_name');
    await safeRenameColumn('clients', 'patronymic', 'middle_name');
    await safeRenameColumn('clients', 'passportSeries', 'passport_series');
    await safeRenameColumn('clients', 'passportNumber', 'passport_number');
    await safeRenameColumn('clients', 'passportIssuer', 'issued_by');
    await safeRenameColumn('clients', 'passportIssueDate', 'issue_date');

    // 2. Изменение таблицы employees
    await safeRenameColumn('employees', 'surname', 'last_name');
    await safeRenameColumn('employees', 'name', 'first_name');
    await safeRenameColumn('employees', 'patronymic', 'middle_name');

    // 3. Изменение таблицы car_models
    await safeRenameColumn('car_models', 'additionalInfo', 'additional_info');
    await safeRenameColumn('car_models', 'fuelConsumption', 'fuel_consumption');

    // 4. Изменение таблицы cars
    await safeRenameColumn('cars', 'available', 'in_stock');

    // 5. Изменение таблицы requests
    await safeRenameTable('requests', 'applications');
    await safeRenameColumn('applications', 'date', 'application_date');

    // 6. Изменение таблицы contracts
    await safeRenameColumn('contracts', 'request_id', 'application_id');
    await safeRenameColumn('contracts', 'number', 'contract_number');
  },

  async down (queryInterface, Sequelize) {
    // Функция для безопасного переименования колонки
    const safeRenameColumn = async (tableName, oldColumnName, newColumnName) => {
      try {
        // Проверяем существование старой колонки
        const tableDescription = await queryInterface.describeTable(tableName);
        if (tableDescription[oldColumnName]) {
          await queryInterface.renameColumn(tableName, oldColumnName, newColumnName);
          console.log(`Колонка ${oldColumnName} в таблице ${tableName} успешно переименована в ${newColumnName}`);
        } else {
          console.log(`Колонка ${oldColumnName} в таблице ${tableName} не существует или уже переименована`);
        }
      } catch (error) {
        console.error(`Ошибка при переименовании колонки ${oldColumnName} в таблице ${tableName}:`, error);
      }
    };

    // Функция для безопасного переименования таблицы
    const safeRenameTable = async (oldTableName, newTableName) => {
      try {
        // Проверяем существование старой таблицы
        const tables = await queryInterface.showAllTables();
        if (tables.includes(oldTableName)) {
          await queryInterface.renameTable(oldTableName, newTableName);
          console.log(`Таблица ${oldTableName} успешно переименована в ${newTableName}`);
        } else {
          console.log(`Таблица ${oldTableName} не существует или уже переименована`);
        }
      } catch (error) {
        console.error(`Ошибка при переименовании таблицы ${oldTableName}:`, error);
      }
    };

    // 6. Возврат изменений таблицы contracts
    await safeRenameColumn('contracts', 'application_id', 'request_id');
    await safeRenameColumn('contracts', 'contract_number', 'number');

    // 5. Возврат изменений таблицы applications
    await safeRenameColumn('applications', 'application_date', 'date');
    await safeRenameTable('applications', 'requests');

    // 4. Возврат изменений таблицы cars
    await safeRenameColumn('cars', 'in_stock', 'available');

    // 3. Возврат изменений таблицы car_model
    await safeRenameColumn('car_models', 'fuel_consumption', 'fuelConsumption');
    await safeRenameColumn('car_models', 'additional_info', 'additionalInfo');


    // 2. Возврат изменений таблицы employees
    await safeRenameColumn('employees', 'middle_name', 'patronymic');
    await safeRenameColumn('employees', 'first_name', 'name');
    await safeRenameColumn('employees', 'last_name', 'surname');

    // 1. Возврат изменений таблицы clients
    await safeRenameColumn('clients', 'issue_date', 'passportIssueDate');
    await safeRenameColumn('clients', 'issued_by', 'passportIssuer');
    await safeRenameColumn('clients', 'passport_number', 'passportNumber');
    await safeRenameColumn('clients', 'passport_series', 'passportSeries');
    await safeRenameColumn('clients', 'middle_name', 'patronymic');
    await safeRenameColumn('clients', 'first_name', 'name');
    await safeRenameColumn('clients', 'last_name', 'surname');
  }
};