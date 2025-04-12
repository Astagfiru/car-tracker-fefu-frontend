# Первоначальная настройка проекта

1. Скачать Node.js + npm: [https://nodejs.org/](https://nodejs.org/).
2. Скачать `bash` (Для Windows)
```
wsl --install
```
3. Установить `postgres`
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```
4. После установки открой терминал и проверь, что всё установилось:
```bash
node -v
npm -v
```
5. Установка зависимостей
```bash
cd server
npm i
```
6. Запуск проекта в режиме разработки
```bash
npm run start:dev
```
7. Перейти в браузере по адресу сервера `localhost:3000`

