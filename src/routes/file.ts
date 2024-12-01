import { Router } from "express";
import { createFileController } from "../controllers/file/create-file-controller";
import { uploadFileMiddleware } from "../middlewares/files/upload-file-middleware";
import { getFileController } from "../controllers/file/get-file-controller";
import { validateToken } from "../middlewares/auth/validate-token";


const fileRouter = Router();

fileRouter.get("/:id_file", [validateToken], getFileController)

fileRouter.post("/", [validateToken,uploadFileMiddleware], createFileController)

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