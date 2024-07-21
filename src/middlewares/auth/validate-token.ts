import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/token";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.auth_token as string
  const valid = verifyToken(token)
  if(valid){
    return next()
  }
  return res.status(401).json({
    message: "Not valid token",
    error: "Not valid token"
  })
}