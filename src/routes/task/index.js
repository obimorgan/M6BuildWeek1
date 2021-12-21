import express from "express"
import {Task} from "../../db/models/index.js"

const taskRouter = express.Router()

taskRouter
.route("/")
.get( async (req, res, next) => {
    try {
        const tasks = await Task.findAll()
        res.send(tasks)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

.post(async (req, res, next) => {
    try {
        const { plannerId, task, done } = req.body
        console.log(req.body)
        const newTask = await Task.create(req.body)
        res.send(newTask)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

taskRouter
.route("/:id")
.put(async (req, res, next) => {
    try {
        console.log(req.body)
        const updateTasks = await Task.update(req.body, {
            where: { id: req.params.id },
            returning: true
        })
        res.status(201).send(updateTasks[1][0])
    } catch (error) {
        console.log(error)
        next(error)
    }
})
.delete(async (req,res, next) => {
    try {
        const result = await Task.destroy({
            where: {
                id: req.params.id
            }
        })
        if (result > 0) {
            res.send("ok")
        }else{
            res.status(404).send("not found")
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})
.get(async (req, res, next) => {
    try {
        const result = await Task.findByPk(req.params.id)

        res.send(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

export default taskRouter
