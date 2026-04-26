const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING, // Using STRING for cross-dialect compatibility (Postgres/SQLite)
    defaultValue: 'Pending',
    validate: {
      isIn: [['Pending', 'Completed']]
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

module.exports = Task;
