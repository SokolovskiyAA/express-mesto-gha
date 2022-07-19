const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Соколовский Андрей',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Разработчик',
  },
  avatar: {
    type: String,
    default: 'https://bipbap.ru/wp-content/uploads/2018/09/a6959bb1263fe6ad530534c2bb942bd8.jpg',
    required: true,
  },
});

module.exports.User = mongoose.model('user', userSchema);