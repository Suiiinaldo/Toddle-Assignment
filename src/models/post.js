'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Like, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Comment, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
    }
  }
  Post.init({
    image: {
      type:DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
      content: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};