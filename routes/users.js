const router = require('express').Router();
const {
  getUser, getUserById, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);

// обновляет профиль
router.patch('/users/me', updateUser);
// обновляет аватар
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
