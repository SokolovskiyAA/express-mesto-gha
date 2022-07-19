const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const status = require('./utils/status');

const { usersRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');


const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// mongoose.connect('mongodb://localhost:27017/mestodb');
// mongoose.connection.on('connected', () => console.log('Connected'));
// mongoose.connection.on('error', (err) => console.log('Connection failed with - ', err));

app.use((req, res, next) => {
  req.user = {
    _id: '62d0829c85d93c224fc9e049' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(status.NOTFOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});