import express from "express"

const taskRouter = express.Router()

taskRouter.get("/", async (req, res, next) => {
    try {
        res.send("ok")
    } catch (error) {
        console.log(error)
        next(error)
    }
}) 

export default taskRouter
