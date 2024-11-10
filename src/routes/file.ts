import { Router } from "express";
import { createFileController } from "../controllers/file/create-file-controller";


const fileRouter = Router();

fileRouter.get("/", (req, res) => {
  res.json({
    get: "OK"
  })
})

fileRouter.post("/", createFileController)

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