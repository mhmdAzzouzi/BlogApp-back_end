"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {}
  }
  Post.init(
    {
      uuid: DataTypes.STRING,
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      body: DataTypes.STRING,
      published: DataTypes.BOOLEAN,
      category: DataTypes.STRING,
      likes: DataTypes.INTEGER(11),
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
