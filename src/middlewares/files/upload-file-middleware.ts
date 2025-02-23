import type { NextFunction, Request, Response } from "express";
import { upload } from "../../lib/files/upload-file";
import multer from "multer";

export const uploadFileMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uploadMiddleware = upload.single("file");

	uploadMiddleware(req, res, (error) => {
		if (error instanceof multer.MulterError) {
			return res.status(400).json({
				message: "An error happened",
				error: error.message,
			});
		}
		if (error) {
			return res.status(400).json({
				message: "An error happened",
				error: error.message,
			});
		}
		next();
	});
};
