const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());


app.use('/static', express.static(path.join(__dirname, '..', 'client')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

const routes = require('./routes/routs');
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});