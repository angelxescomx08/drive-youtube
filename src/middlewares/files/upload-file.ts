import { Request, Response, NextFunction } from "express";
import { upload } from "../../utils/files/storage";
import multer from "multer";

export const uploadFileMiddleware = async (
  req: Request, res: Response, next: NextFunction
) => {
  const uploadFile = upload.single("file")

  uploadFile(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({
        message: "An error happened",
        error: error.message
      })
    } else if (error) {
      return res.status(400).json({ message: error.message });
    }
    next()
  })
}