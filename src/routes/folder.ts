import { Request, Response, Router } from "express";
import { createFolderController } from "../controllers/folder/create-folder";
import { validateToken } from "../middlewares/auth/validate-token";

const folderRouter = Router()

folderRouter.get("/", (req: Request, res: Response) => {
  res.json({
    message: "get folders"
  })
});

folderRouter.post("/", [validateToken], createFolderController);

folderRouter.put(
  "/", (req: Request, res: Response) => {
    res.json({
      message: "update folders"
    })
  });

folderRouter.delete(
  "/", (req: Request, res: Response) => {
    res.json({
      message: "delete folders"
    })
  });

export default folderRouter