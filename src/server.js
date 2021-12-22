import express from "express"
import cors from "cors"
import taskRouter from "./routes/task/index.js"
import plannerRouter from "./routes/planner/index.js"
import { testDB } from "./db/connection.js"
import errorHandlers from "./middleware/errorshandlers.js"

const server = express()
const PORT = process.env.PORT

server.use(express.json())
server.use(cors())

server.use("/tasks", taskRouter)
server.use("/planner", plannerRouter)

server.use(errorHandlers)

server.listen(PORT, ()=> {
    console.log("Server is running on:", PORT)
    testDB()
})