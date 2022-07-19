const { Card } = require('../models/cards');
const status = require('../utils/status');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      }
      else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .populate('owner')
    // .then((card) => {
    //   if (String(card.owner._id) === req.user._id) {
    //     return Card.findByIdAndRemove(req.params.cardId);
    //   }
    // })
    .then((card) => {
      if (card) {
        res.send(card);
      }
      else {
        res.status(status.NOTFOUND).send({ message: 'Карточка не найдена' });
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

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (card) {
        res.send(card);
      }
      else {
        res.status(status.NOTFOUND).send({ message: 'Карточка не найдена' });
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

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (card) {
        res.send(card);
      }
      else {
        res.status(status.NOTFOUND).send({ message: 'Карточка не найдена' });
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

