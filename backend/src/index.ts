import { Hono } from "hono";
import { router as blogRouter } from "./routes/posts";
import { userRouter } from "./routes/user";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
app.use(
  "/*",
  cors({
    origin: "https://inkspire-2-1rwnmw0xv-tejas-waghs-projects.vercel.app/",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS","DELETE","PUT"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/api/auth", userRouter);
app.route("/api/blog", blogRouter);

export default app;
