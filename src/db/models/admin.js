'use strict';
import { Sequelize } from "sequelize";
import sequelize from "../../config/database.js";

export default () => {
  const admin = sequelize.define('admin', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    uname: {
      type: Sequelize.STRING
    },
    mail: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      type: Sequelize.DATE
    }
  },
  {
    paranoid: true,
    freezeTableName:true,
    modelName: 'admin',
  })

  return admin
}