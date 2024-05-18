'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'followerId', as: 'Follower' });
      // Follow belongs to User (as followee)
      this.belongsTo(models.User, { foreignKey: 'followeeId', as: 'Followee' });
    }
  }
  Friend.init({
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};