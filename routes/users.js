const router = require('express').Router();
const {
  getAllUsers, getUserById, createUser, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);

// обновляет профиль
router.patch('/users/me', updateUser);
// обновляет аватар
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
