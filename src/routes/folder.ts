import { Request, Response, Router } from "express";
import { createFolderController } from "../controllers/folder/create-folder";
import { validateToken } from "../middlewares/auth/validate-token";
import { getContentFolderController } from "../controllers/folder/get-content-folder";
import { getFolderController } from "../controllers/folder/get-folder-controller";
import { updateFolderController } from "../controllers/folder/update-folder-controller";

const folderRouter = Router()

folderRouter.get(
  "/:id_folder", [validateToken], getFolderController
);

folderRouter.get(
  "/content/:id_folder", [validateToken], getContentFolderController
);

folderRouter.post("/", [validateToken], createFolderController);

folderRouter.put(
  "/:id_folder", [validateToken], updateFolderController);

folderRouter.delete(
  "/", (req: Request, res: Response) => {
    res.json({
      message: "delete folders"
    })
  });

export default folderRouter