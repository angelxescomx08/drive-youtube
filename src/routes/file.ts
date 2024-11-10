import { Router } from "express";


const fileRouter = Router();

fileRouter.get("/", (req, res) => {
  res.json({
    get: "OK"
  })
})

fileRouter.post("/", (req, res) => {
  res.json({
    post: "OK"
  })
})

fileRouter.put("/", (req, res) => {
  res.json({
    put: "OK"
  })
})

fileRouter.delete("/", (req, res) => {
  res.json({
    delete: "OK"
  })
})


export default fileRouter;