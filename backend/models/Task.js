import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

/**
 * Task model (maps to the `Tasks` table in MySQL).
 *
 * title       - required, max 100 chars
 * description - required, minimum 20 characters (enforced at the model
 *               level so it's impossible to bypass via direct API calls)
 * status      - one of: pending | in-progress | completed
 * timestamps  - createdAt / updatedAt managed automatically by Sequelize
 */
class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title is required" },
        len: { args: [1, 100], msg: "Title cannot exceed 100 characters" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Description is required" },
        len: { args: [20, 1000], msg: "Description must be at least 20 characters long" },
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true, // adds createdAt & updatedAt columns
  }
);

export default Task;
