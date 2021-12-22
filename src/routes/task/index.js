import express from "express"
import {Task} from "../../db/models/index.js"
import createHttpError from "http-errors"
import { Op } from "sequelize"

const taskRouter = express.Router()

taskRouter
.route("/")
.get( async (req, res, next) => {
    try {
        const tasks = await Task.findAll({
            where: {
                done: false
            },
            ...(req.query.task && {
                where: {
                    done: false,
                    task: {
                        [Op.iLike]: `%${req.query.task}%`
                    }
                }
            })
        })
        res.send(tasks)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
.post(async (req, res, next) => {
    try {
        delete req.body.id
        const newTask = await Task.create(req.body)
        if (newTask.id) return res.send(newTask)
        next(createHttpError(400, 'Bad Request'))
    } catch (error) {
        console.log(error)
        next(error)
    }
})

taskRouter.get('/history', async (req, res, next) => {
    try {
        const tasks = await Task.findAll({
            where: {
                done: true
            }
        })
        res.send(tasks)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

taskRouter
.route("/:id")
.put(async (req, res, next) => {
    try {
        if (req.params.id.length !== 36) return res.status(400).send('Invalid ID')
        if (req.body === {}) return res.status(400).send('Must Provide A Body')
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
        if (req.params.id.length !== 36) return res.status(400).send('Invalid ID')
        // const result = await Task.destroy({
        //     where: { id: req.params.id }
        // })
        const result = await Task.update({
            done: true
        }, {
            where: {
                id: req.params.id
            }
        })
        if (result < 1) return res.status(404).send("not found")
        return res.send("ok")
    } catch (error) {
        console.log(error)
        next(error)
    }
})
.get(async (req, res, next) => {
    try {
        // if (req.params.id.length !== 36) return res.status(400).send('Invalid ID')
        if (req.params.id.length !== 36) return next(createHttpError(400, 'Invalid ID'))
        const result = await Task.findByPk(req.params.id)
        if (!result) return res.status(404).send('Not Found')
        res.send(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
})



export default taskRouter
