'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcrypt");
const { ServerConfig } = require('../config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Like, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Comment, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.belongsToMany(models.User, {
        through: models.Friend,
        as: 'Followees',
        foreignKey: 'followerId',
        otherKey: 'followeeId',
      });

      this.belongsToMany(models.User, {
        through: models.Friend,
        as: 'Followers',
        foreignKey: 'followeeId',
        otherKey: 'followerId',
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true,
      },

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,50],
      },

    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.beforeCreate(function ecnrypt(user){
    const encryptedPass = bcrypt.hashSync(user.password,+ServerConfig.SALT_ROUNDS);
    user.password = encryptedPass;
  });
  return User;
};