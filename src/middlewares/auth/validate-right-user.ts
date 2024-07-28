import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { envs } from "../../config/env";
import { userJWTPayload } from "../../types/user";

export const validRightUserMiddleware = (req:Request,res: Response, next: NextFunction) => {
  try {
    const {id_user} = req.params
    const auth_token = req.headers.auth_token as string
    const user: userJWTPayload = jwt.verify(auth_token,envs.SECRET_PASSWORD_KEY) as userJWTPayload

    if(user.id_user !== id_user){
      return res.status(401).json({
        message: "Not authorized",
        error: "Not authorized"
      })
    }

    return next()

  } catch (error) {
    return res.json({
      message: "Something wrong happen",
      error: "Something wrong happen"
    })
  }
}