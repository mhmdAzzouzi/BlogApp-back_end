const { Like, Post, User } = require("../models");
const { Op } = require("sequelize");

// list all likes of registered user
const list = async (req, res) => {
  try {
    const likes = await Like.findAll({
      where: {
        userId:  req.user.uuid,
      },
    });
    if (likes) return res.status(200).json(likes);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const toggleLike = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.user.uuid;
    const likes = await Like.findAll({
      where: {
        [Op.and]: [{ postId }, { userId }],
      },
    });
    if (likes.length > 0) {
      likes[0].destroy();
      return res.status(201).send({ message: "unliked" });
    }
    const like = await Like.create({
      postId,
      userId,
    });
    if (like) {
      return res.status(201).send({ like });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteLike = async (req, res) => {
  try {
    const like = await Like.findOne({ where: { uuid: req.params.uuid } });
    if (!like) {
      return res.status(404).send({
        message: "Like Not Found",
      });
    }
    like.destroy();
    return res.status(200).send({ message: "Like deleted." });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  list,
  toggleLike,
  deleteLike,
};
