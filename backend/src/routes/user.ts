import { Hono } from "hono";
import { deleteUser, google, signin, signup, updateUser, verifyUser } from "../middlewares/auth";
// import {signinType,signupType} from "@tejas09/medium"
export type contextType = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
};

export const userRouter = new Hono<contextType>();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/google", google)
userRouter.post("/update/:id", verifyUser, updateUser);
userRouter.get("/delete/:id", verifyUser, deleteUser)


