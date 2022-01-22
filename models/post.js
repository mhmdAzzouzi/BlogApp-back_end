"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: {allowNull:false},

      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
      },
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      body: DataTypes.STRING,
      published: DataTypes.BOOLEAN,
      category: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      slug: DataTypes.STRING,
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
