const cardsRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards); // — возвращает все карточки

cardsRouter.post('/', createCard); // — создаёт карточку

cardsRouter.delete('/:cardId', deleteCard); // — удаляет карточку по идентификатору

cardsRouter.put('/:cardId/likes', putLike); // - поставить лайк

cardsRouter.delete('/:cardId/likes', deleteLike); // - удалить лайк

module.exports = { cardsRouter };
