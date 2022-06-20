const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.find({}).then((data) => {
    if (data.length >= 1) {
      res.send({ users: data });
    } else {
      res.status(400).send({ message: 'Пользователи не найдены' });
    }
  }).catch(() => {
    res.status(500);
    next();
  });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId).then((data) => {
    if (data) {
      res.send({ user: data });
    } else {
      res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
    }
  }).catch(() => {
    res.status(500);
    next();
  });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  // if (!name || !about || !avatar) {
  //   res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
  // }

  User.create({ name, about, avatar }).then((user) => {
    res.send({ user });
  }).catch(()={
    res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
  });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  }).then((data) => {
    if (data) {
      res.send({ user: data });
    } else {
      res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
    }
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
    } else {
      res.status(500);
      next();
    }
  });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  }).then((data) => {
    if (data) {
      res.send({ user: data });
    } else {
      res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
    }
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
    } else {
      res.status(500);
      next();
    }
  });
};
