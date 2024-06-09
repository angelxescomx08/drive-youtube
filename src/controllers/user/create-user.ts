import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db } from "../../db/db";
import { user } from "../../db/schema";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password);

    const result = await db
      .insert(user)
      .values({
        email,
        id_user: crypto.randomUUID(),
        password: hashPassword,
      })
      .returning({
        email: user.email,
        id_user: user.id_user,
      });

    res.json({
      message: "User created",
      user: result.at(0),
    });
  } catch (error) {
    res.status(500).json({
      message: "Something wrong happen unfortunately",
    });
  }
}