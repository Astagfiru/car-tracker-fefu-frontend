# Инструкция для разработчика

## Предварительные требования
1. Установить Node.js + npm: [https://nodejs.org/](https://nodejs.org/)
2. Установить PostgreSQL

## Настройка базы данных
1. Создать базу данных в PostgreSQL:
```sql
CREATE DATABASE car_tracker;
```
2. Создать файл .env в корне сервера с содержимым:
```
DB_NAME=car-tracker-fefu
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
```

## Установка зависимостей
```bash
cd server
npm install
```

## Миграции базы данных
```bash
npx sequelize-cli db:migrate
```

## Запуск сервера
```bash
npm run start:dev
```

Сервер будет доступен по адресу: http://localhost:3000

