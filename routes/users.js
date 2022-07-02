const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getAllUsers, getUserById, createUser, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.get('/users', getAllUsers);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
}), getUserById);
router.post('/users', createUser);

// обновляет профиль
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
// обновляет аватар
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
