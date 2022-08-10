const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  updateProfile,
  getSignedInUser
} = require('../controllers/users');

usersRouter.get('/', getUsers);

router.get('/me', getSignedInUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(https?:\/\/)[a-zA-Z.:0-9-?]{2,}\.[a-z]{2,}([-a-zA-Z0-9@:%_+.~#?&=/]*)/),
  }),
}), updateAvatar);

module.exports = { usersRouter };
