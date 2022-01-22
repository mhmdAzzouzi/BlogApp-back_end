const { Comment, Post, User } = require("../models");

const list = async (req, res) => {
  try {
    const comments = await Comment.findAll({includes: User});
    if (comments) return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const comment = await Comment.findOne({ where: { uuid: req.params.uuid } });
    if (comment) return res.status(200).json(comment);
    return res.status(404).json({ message: "Comment not found!" });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const add = async (req, res) => {
  try {
    const { body, published, PostUuid, UserUuid } = req.body;
    const comment = await Comment.create({
      body,
      PostUuid,
      UserUuid,
    })
    if (comment) return res.status(201).send(comment);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const update = async (req, res) => {
  try {
    const comment = await Comment.findOne({ where: { uuid: req.params.uuid } });
    if (!comment) {
      return res.status(404).send({
        message: "Comment Not Found",
      });
    }
    comment.update({
      body: req.body.body || comment.body,
    });
    return res.status(200).send(comment);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ where: { uuid: req.params.uuid } });
    if (!comment) {
      return res.status(404).send({
        message: "Comment Not Found",
      });
    }
    Comment.destroy();
    return res.status(200).send({ message: "Comment deleted." });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  list,
  getById,
  add,
  update,
  deleteComment,
};
