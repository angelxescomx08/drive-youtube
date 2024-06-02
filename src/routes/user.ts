import { Router } from "express";
import { db } from "../db/db";
import { user } from "../db/schema";
import bcrypt from "bcryptjs";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({
    message: "List of all users",
  });
});

userRouter.post("/", async (req, res) => {
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
      message: "Something wrong happen",
    });
  }
});

userRouter.put("/", (req, res) => {
  res.json({
    message: "PUT",
  });
});

userRouter.delete("/", (req, res) => {
  res.json({
    message: "DELETE",
  });
});

export default userRouter;
