import { Request, Response, Router } from "express";

const folderRouter = Router()

folderRouter.get("/", (req: Request, res: Response) => {
  res.json({
    message: "get folders"
  })
});

folderRouter.post("/", (req: Request, res: Response) => {
  res.json({
    message: "create folders"
  })
});

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