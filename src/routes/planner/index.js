import express from "express"
import {Planner} from "../../db/models/index.js"

const plannerRouter = express.Router()

//.1
plannerRouter.get("/", async (req, res, next) => {
    try {

     const plan = await Planner.findAll()
        res.send(plan)
    } catch (error) {
        console.log(error)
        next(error)
    }
});
//.2
plannerRouter.get("/:id", async (req, res, next) => {
    try {
    if (req.params.id.length !== 36) return res.status(400).send('Invalid ID')
     const plan = await Planner.findByPk(req.params.id)
     if(plan)  {
         res.send(plan)
     }else{
         res.status(404).send("Not found")
     }
    } catch (error) {
        console.log(error)
        next(error)
    }
}) 
//.3
plannerRouter.post("/", async (req, res, next) => {
    try {

     const plan = await Planner.create(req.body)  
         res.send(plan)
    } catch (error) {
        console.log(error)
        next(error)
    }
}) 
//.4
plannerRouter.put("/:id", async (req, res, next) => {
    try {
    if (req.params.id.length !== 36) return res.status(400).send('Invalid ID')
     const plan = await Planner.update(req.body,{
     where  :{id:req.params.id},
     returning: true
     })  
         res.send(plan[1][0]);
    } catch (error) {
        console.log(error)
        next(error)
    }
}) 
//.5
plannerRouter.delete("/:id", async (req, res, next) => {
    try {
    if (req.params.id.length !== 36) return res.status(400).send('Invalid ID')
     const plan = await Planner.destroy({
          where: {
            id: req.params.id,
          },
        });
  
        if (plan) {
          res.send("ok");
        } else {
          res.status(404).send("not found");
        }
      } catch (e) {
        console.log(e);
        next(e);
      }
    });
  

export default plannerRouter