const { User } = require('../models/users');
const status = require('../utils/status');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      }
      else {
        res.status(status.NOTFOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      }
      else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      }
      else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(status.NOTFOUND).send({ message: 'Пользователь не найден' });
      }
      else if (err.name === 'ValidationError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      }
      else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar = false } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(status.NOTFOUND).send({ message: 'Пользователь не найден' });
      }
      else if (err.name === 'ValidationError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      }
      else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};