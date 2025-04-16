const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Путь к файлу конфигурации
const configPath = path.resolve(__dirname, '../config/config.json');

// Функция для проверки файла конфигурации
function checkConfigFile() {
  console.log('Проверка файла конфигурации...');
  
  // Проверяем существование файла
  if (!fs.existsSync(configPath)) {
    console.error('\x1b[31mОШИБКА: Файл config.json не найден!\x1b[0m');
    createConfigTemplate();
    return;
  }
  
  // Читаем содержимое файла
  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Проверяем, пустой ли файл
    if (!configContent.trim()) {
      console.error('\x1b[31mОШИБКА: Файл config.json пуст!\x1b[0m');
      createConfigTemplate();
      return;
    }
    
    // Пытаемся распарсить JSON
    try {
      const config = JSON.parse(configContent);
      
      // Проверяем наличие необходимых полей
      if (!config.development || 
          !config.development.username || 
          !config.development.password || 
          !config.development.database || 
          !config.development.host || 
          !config.development.dialect) {
        console.error('\x1b[31mОШИБКА: В файле config.json отсутствуют необходимые поля!\x1b[0m');
        createConfigTemplate();
        return;
      }
      
      console.log('\x1b[32mФайл config.json корректно настроен.\x1b[0m');
      
    } catch (parseError) {
      console.error('\x1b[31mОШИБКА: Файл config.json содержит некорректный JSON!\x1b[0m');
      createConfigTemplate();
    }
    
  } catch (readError) {
    console.error(`\x1b[31mОШИБКА при чтении файла: ${readError.message}\x1b[0m`);
  }
}

// Функция для создания шаблона конфигурации на основе .env
function createConfigTemplate() {
  console.log('\x1b[33mСоздаю шаблон конфигурации на основе данных из .env файла...\x1b[0m');
  
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
  console.log(JSON.stringify(configTemplate, null, 2));
  console.log('\x1b[33m\nСкопируйте эту конфигурацию в файл config.json по пути:\x1b[0m');
  console.log(`\x1b[36m${configPath}\x1b[0m`);
}

// Запускаем проверку
checkConfigFile();