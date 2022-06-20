const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({}).then((data) => {
    if (data.length >= 1) {
      res.send({ cards: data });
    } else {
      res.status(400).send({ message: 'Карточки не найдены' });
    }
  }).catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  if (!name || !link) {
    res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
  }
  Card.create({ name, link, owner: req.user._id }).then((data) => {
    res.send({ card: data });
  }).catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId).then((data) => {
    if (data) {
      res.send({ card: data });
    } else { res.status(404).send({ message: 'Карточка с указанным _id не найдена' }); }
  }).catch(() => {
    res.status(500);
    next();
  });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((data) => {
    if (data) {
      res.send({ card: data });
    } else { res.status(404).send({ message: 'Передан несуществующий _id карточки' }); }
  }).catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
    } else {
      res.status(500);
      next();
    }
  });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((data) => {
    if (data) {
      res.send({ card: data });
    } else { res.status(404).send({ message: 'Передан несуществующий _id карточки' }); }
  }).catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные для снятии лайка' });
    } else {
      res.status(500);
      next();
    }
  });
};
