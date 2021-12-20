import sequelize from "../connection.js";
import sequel from "sequelize"

const {DataTypes} = sequel

const Task = sequelize.define(
    "task", {
        id : {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        task: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
)

export default Task