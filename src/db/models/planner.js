import sequelize from "../connection.js";
import sequel from "sequelize"

const {DataTypes} = sequel

const Planner = sequelize.define(
    "planner", {
        id : {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

export default Planner