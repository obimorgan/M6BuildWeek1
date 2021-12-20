import express from "express"
import {Planner} from "../../db/models/index.js"

const plannerRouter = express.Router()

plannerRouter
.get("/", async (req, res, next) => {
    try {
        res.send("ok")
    } catch (error) {
        console.log(error)
        next(error)
    }
})
.post("/", async (req, res, next) => {
    try {
        console.log(req.body)
        const planner = await Planner.create(req.body)
        res.send(planner)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

export default plannerRouter