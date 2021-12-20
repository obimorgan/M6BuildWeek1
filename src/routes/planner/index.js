import express from "express"

const plannerRouter = express.Router()

plannerRouter.get("/", async (req, res, next) => {
    try {
        res.send("ok")
    } catch (error) {
        console.log(error)
        next(error)
    }
}) 

export default plannerRouter