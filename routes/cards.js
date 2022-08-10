const cardsRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards); // — возвращает все карточки

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(https?:\/\/)[a-zA-Z.:0-9-?]{2,}\.[a-z]{2,}([-a-zA-Z0-9@:%_+.~#?&=/]*)/),
  }),
}), createCard); // — создаёт карточку

cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCard); // — удаляет карточку по идентификатору

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), putLike); // - поставить лайк

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteLike); // - удалить лайк

module.exports = { cardsRouter };
