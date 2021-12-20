import express from "express"
import {Task} from "../../db/models/index.js"

const taskRouter = express.Router()

taskRouter.get("/", async (req, res, next) => {
    try {
        const tasks = Task.findAll()
        res.send(tasks)
    } catch (error) {
        console.log(error)
        next(error)
    }
}) 

export default taskRouter
