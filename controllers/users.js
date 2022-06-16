const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.find({}).then((data) => {
    res.send({ users: data });
  }).catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId).then((data) => {
    res.send({ user: data });
  }).catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => {
    res.send({ user });
  }).catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  }).then((data) => {
    res.send({ user: data });
  }).catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  }).then((data) => {
    res.send({ user: data });
  }).catch(next);
};
