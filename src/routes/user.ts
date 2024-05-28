import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({
    message: "List of all users",
  });
});

userRouter.post("/", (req, res) => {
  res.json({
    message: "POST",
  });
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
