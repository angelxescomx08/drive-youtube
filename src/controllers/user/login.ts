import { Request, Response } from "express";
import { createUserSchema } from "../../types/user";
import { db } from "../../db/db";
import { eq } from "drizzle-orm";
import { user } from "../../db/schema";
import bcrypt from 'bcryptjs';

export const loginController = async (req:Request,res:Response)=>{
  try {
    const {email,password} = req.body
    const validFields = createUserSchema.safeParse({
      email,
      password
    })
    if(!validFields.success){
      return res.status(400).json({
        message: "Not valid credentials",
        error: validFields.error
      })
    }
    const result = await db.query.user.findFirst({
      where: eq(user.email,email)
    })

    if(!result){
      return res.status(400).json({
        message: "Not valid credentials",
        error: validFields.error
      })
    }

    const {id_user,password: hash} = result
    const valid = bcrypt.compareSync(password,hash)

    if(!valid){
      return res.status(400).json({
        message: "Not valid credentials",
        error: "Not valid credentials"
      })
    }

    return res.json({
      message: "Welcomed",
      user: {
        id_user,
        email
      }
    })

  } catch (error) {
    res.status(500).json({
      message: "Something wrong happen unfortunately",
      error
    });
  }
}