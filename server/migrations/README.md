# Инструкция по работе с миграциями

## Предварительные требования
1. Убедитесь, что файл `.env` в корне сервера содержит все необходимые переменные для подключения к БД:
   - DB_NAME
   - DB_USER
   - DB_PASSWORD
   - DB_HOST
   - DB_PORT

## Основные команды

### Применить все миграции
```bash
npx sequelize-cli db:migrate
```

### Откатить последнюю миграцию
```bash
npx sequelize-cli db:migrate:undo
```

### Откатить все миграции
```bash
npx sequelize-cli db:migrate:undo:all
```

### Проверить статус миграций
```bash
npx sequelize-cli db:migrate:status
```

## Создание новой миграции
```bash
npx sequelize-cli migration:generate --name имя-миграции
```

Примечание: Все команды должны выполняться из папки `server`.