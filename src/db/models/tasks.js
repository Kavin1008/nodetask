'use strict';


export default (sequelize, DataTypes) => {
  const Task = sequelize.define('task', {
    task_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {  
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user', 
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    taskname: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      allowNull: false,
      defaultValue: 'pending'
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

  Task.associate = (models) => {
    Task.belongsTo(models.user, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };

  return Task;
};
