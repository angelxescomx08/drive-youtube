import { Router } from "express";
import { createUserController } from "../controllers/user/create-user";


const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({
    message: "List of all users",
  });
});

userRouter.post("/", createUserController);

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
