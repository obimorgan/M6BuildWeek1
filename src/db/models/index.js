import Task from "./task.js";
import Planner from "./planner.js";


Task.belongsTo(Planner, {onDelete: "CASCADE"})
Planner.hasMany(Task, {onDelete: "CASCADE"})

export { Task, Planner }