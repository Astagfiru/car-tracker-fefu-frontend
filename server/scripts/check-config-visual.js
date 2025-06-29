const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Путь к файлу конфигурации
const configPath = path.resolve(__dirname, '../config/config.json');

// Функция для проверки файла конфигурации
function checkConfigFile() {
  console.log('\x1b[1m\x1b[36m=== ПРОВЕРКА ФАЙЛА КОНФИГУРАЦИИ ===\x1b[0m');
  console.log(`\x1b[33mПуть к файлу: \x1b[0m${configPath}\n`);
  
  // Проверяем существование файла
  if (!fs.existsSync(configPath)) {
    console.error('\x1b[41m\x1b[37m ОШИБКА \x1b[0m \x1b[31mФайл config.json не найден!\x1b[0m');
    createConfigTemplate();
    return;
  }
  
  // Читаем содержимое файла
  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Проверяем, пустой ли файл
    if (!configContent.trim()) {
      console.error('\x1b[41m\x1b[37m ОШИБКА \x1b[0m \x1b[31mФайл config.json пуст!\x1b[0m');
      createConfigTemplate();
      return;
    }
    
    // Пытаемся распарсить JSON
    try {
      const config = JSON.parse(configContent);
      
      console.log('\x1b[33mТекущее содержимое файла:\x1b[0m');
      console.log('\x1b[36m' + JSON.stringify(config, null, 2) + '\x1b[0m\n');
      
      // Проверяем наличие необходимых полей
      const missingFields = [];
      
      if (!config.development) {
        missingFields.push('development');
      } else {
        if (!config.development.username) missingFields.push('development.username');
        if (!config.development.password) missingFields.push('development.password');
        if (!config.development.database) missingFields.push('development.database');
        if (!config.development.host) missingFields.push('development.host');
        if (!config.development.dialect) missingFields.push('development.dialect');
      }
      
      if (missingFields.length > 0) {
        console.error(`\x1b[41m\x1b[37m ОШИБКА \x1b[0m \x1b[31mВ файле config.json отсутствуют поля: ${missingFields.join(', ')}\x1b[0m`);
        createConfigTemplate();
        return;
      }
      
      // Проверяем соответствие с .env файлом
      const envMismatches = [];
      
      if (config.development.username !== process.env.DB_USER) {
        envMismatches.push(`username: ${config.development.username} (в .env: ${process.env.DB_USER})`);
      }
      if (config.development.password !== process.env.DB_PASSWORD) {
        envMismatches.push(`password: ${config.development.password} (в .env: ${process.env.DB_PASSWORD})`);
      }
      if (config.development.database !== process.env.DB_NAME) {
        envMismatches.push(`database: ${config.development.database} (в .env: ${process.env.DB_NAME})`);
      }
      if (config.development.host !== process.env.DB_HOST) {
        envMismatches.push(`host: ${config.development.host} (в .env: ${process.env.DB_HOST})`);
      }
      if (config.development.dialect !== process.env.DB_DIALECT) {
        envMismatches.push(`dialect: ${config.development.dialect} (в .env: ${process.env.DB_DIALECT})`);
      }
      
      if (envMismatches.length > 0) {
        console.warn('\x1b[43m\x1b[30m ВНИМАНИЕ \x1b[0m \x1b[33mНесоответствия между config.json и .env файлом:\x1b[0m');
        envMismatches.forEach(mismatch => console.log(`\x1b[33m- ${mismatch}\x1b[0m`));
        console.log('');
      } else {
        console.log('\x1b[42m\x1b[30m УСПЕХ \x1b[0m \x1b[32mФайл config.json корректно настроен и соответствует .env файлу.\x1b[0m\n');
      }
      
    } catch (parseError) {
      console.error('\x1b[41m\x1b[37m ОШИБКА \x1b[0m \x1b[31mФайл config.json содержит некорректный JSON!\x1b[0m');
      console.error(`\x1b[31mДетали ошибки: ${parseError.message}\x1b[0m`);
      createConfigTemplate();
    }
    
  } catch (readError) {
    console.error(`\x1b[41m\x1b[37m ОШИБКА \x1b[0m \x1b[31mПри чтении файла: ${readError.message}\x1b[0m`);
  }
}

// Функция для создания шаблона конфигурации на основе .env
function createConfigTemplate() {
  console.log('\n\x1b[33mСоздаю шаблон конфигурации на основе данных из .env файла...\x1b[0m');
  
  const configTemplate = {
    development: {
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'car-tracker-fefu',
      host: process.env.DB_HOST || 'localhost',
      dialect: process.env.DB_DIALECT || 'postgres'
    }
  };
  
  console.log('\x1b[36mРекомендуемая конфигурация:\x1b[0m');
  console.log('\x1b[32m' + JSON.stringify(configTemplate, null, 2) + '\x1b[0m');
  console.log('\n\x1b[33mДля исправления проблемы:\x1b[0m');
  console.log('\x1b[36m1. Откройте файл config.json по пути:\x1b[0m');
  console.log(`   ${configPath}`);
  console.log('\x1b[36m2. Замените содержимое файла на рекомендуемую конфигурацию выше\x1b[0m');
  console.log('\x1b[36m3. Сохраните файл и перезапустите приложение\x1b[0m');
}

// Запускаем проверку
checkConfigFile();