  'use strict';

  export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uname: {
        type: DataTypes.STRING
      },
      mail: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, {
      paranoid: true,
      freezeTableName: true,
    });

    User.associate = (models) => {
      User.hasMany(models.task, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };

    return User;
  };
