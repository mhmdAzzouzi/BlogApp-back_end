'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.channelId = this.belongsTo(models.Channel, {
        foreignKey: 'channel_id'
      });
    }
  }
  Video.init(
    {
      // id: DataTypes.DataTypes.INTEGER,
      title: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
      },
      channel_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'channel',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Video',
      tableName: 'video',
      freezeTableName: true,
      //freezeTableName: true,
    }
  );
  return Video;
};
