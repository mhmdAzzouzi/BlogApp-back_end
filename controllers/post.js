const { Post, User } = require("../models");
const slugify = require('slugify');

const list = async (req, res) => {
  try {
    const posts = await Post.findAll({include: User});
    if (posts) return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { uuid: req.params.uuid } });
    if (post) return res.status(200).json(post);
    return res.status(404).json({ message: "Post not found!" });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const add = async (req, res) => {
  try {
    const { title, image, body, published, likes, slug, category, UserUuid } = req.body;
    const post = await Post.create({
      title,
      image,
      body,
      published,
      category,
      likes: 0,
      slug: slugify(title, {remove: /[*+~$.()'"!:@]/g, replacement: '_',}),
      UserUuid,
    })
    if (post) return res.status(201).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const update = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { uuid: req.params.uuid } });
    if (!post) {
      return res.status(404).send({
        message: "Post Not Found",
      });
    }
    post.update({
      title: req.body.title || post.title,
      image: req.body.image || post.image,
      body: req.body.body || post.body,
      published: req.body.published || post.published,
      category: req.body.category || post.category,
      likes: req.body.likes || post.likes,
    });
    return res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { uuid: req.params.uuid } });
    if (!post) {
      return res.status(404).send({
        message: "Post Not Found",
      });
    }
    post.destroy();
    return res.status(200).send({ message: "Post deleted." });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  list,
  getById,
  add,
  update,
  deletePost,
};
