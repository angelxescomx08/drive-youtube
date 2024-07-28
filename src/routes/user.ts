import { Router } from "express";
import { createUserController } from "../controllers/user/create-user";
import { loginController } from "../controllers/user/login";
import { getUsers } from "../controllers/user/list-users";
import { validateToken } from "../middlewares/auth/validate-token";
import { updateUserController } from "../controllers/user/update-user";


const userRouter = Router();

userRouter.get("/", [validateToken], getUsers);

userRouter.post("/", createUserController);

userRouter.post("/login", loginController);

userRouter.put("/:id_user", [validateToken],updateUserController);

userRouter.delete("/", (req, res) => {
  res.json({
    message: "DELETE",
  });
});

export default userRouter;
