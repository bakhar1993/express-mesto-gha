const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({}).then((data) => {
    if (data.length >= 1) {
      res.send({ cards: data });
    } else {
      res.status(200).send({ message: 'Карточки не найдены' });
    }
  }).catch(() => {
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }).then((data) => {
    res.send({ card: data });
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
    } else {
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    }
  });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).then((data) => {
    if (data) {
      res.send({ card: data });
    } else { res.status(404).send({ message: 'Карточка с указанным _id не найдена' }); }
  }).catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные при удалении карточки' });
    } else {
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    }
  });
};

module.exports.likeCard = (req, res) => {
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
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    }
  });
};

module.exports.dislikeCard = (req, res) => {
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
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    }
  });
};
