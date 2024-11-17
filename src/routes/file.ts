import { Router } from "express";
import { createFileController } from "../controllers/file/create-file-controller";
import { uploadFileMiddleware } from "../middlewares/files/upload-file";


const fileRouter = Router();

fileRouter.get("/", (req, res) => {
  res.json({
    get: "OK"
  })
})

fileRouter.post("/", [uploadFileMiddleware], createFileController)

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