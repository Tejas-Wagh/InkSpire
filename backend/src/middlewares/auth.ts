import { Context, Next } from "hono";
import { contextType } from "../routes/user";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import {signinType,signupType,updateUserType} from "@tejas09/medium"

export async function signup(c: Context<contextType>) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body:signupType = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        username: body.password,
        profilePicture:
          body.profilePicture ||
          "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
      },
      select: {
        email: true,
        id: true,
        profilePicture: true,
        username: true,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt, user });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
}

export async function signin(c: Context<contextType>) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body:signinType = await c.req.json();
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
    select: {
      email: true,
      id: true,
      profilePicture: true,
      username: true,
      password:true,
    },
  });

  if (!existingUser) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  if(existingUser.password!=body.password){
    c.status(403);
    return c.json({ error: "Invalid Credentials" });
  }

const {password,...rest}= existingUser 
  const jwt = await sign({ id: rest.id }, c.env.JWT_SECRET);
  return c.json({ jwt, user:rest });
}

export const google = async (c: Context<contextType>) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findFirst({ where: { email: body.email } });
    if (user) {
      const jwt = sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt,user });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const newUser = await prisma.user.create({
        data: {
          username:
            body.username.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-8),
          email: body.email,
          password: generatedPassword,
          profilePicture: body.photo,
        },
      });

      const jwt = sign({ id: newUser.id }, c.env.JWT_SECRET);
      return c.json({ jwt,newUser });
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: "Invalid Credentials" });
  }
};

export const verifyUser = async (c: Context<contextType>, next: Next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set("userId", payload.id);
  await next();
};

export const updateUser = async (c: Context<contextType>, next: Next) => {
  const userid = c.get("userId");
  const paramsId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body:updateUserType = await c.req.json();

  if (userid != paramsId) {
    return c.json({ message: "Unauthorized access" });
  }

  try {
    const existingUserData = await prisma.user.findFirst({
      where: { id: userid },
    });

    const updated = await prisma.user.update({
      where: {
        id: userid,
      },
      data: {
        username: body.username || existingUserData?.username,
        email: body.email || existingUserData?.email,
        password: body.password || existingUserData?.password,
      },
      select:{
        email:true,
        id:true,
        username:true,
        profilePicture:true
      }
    });

    return c.json(updated);
  } catch (error) {
    return c.json({ message: "An error occured while updating" });
  }
};

export const deleteUser = async (c: Context<contextType>, next: Next) => {
  const userid = c.get("userId");
  const paramsId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  if (userid != paramsId) {
    return c.json({ message: "Unauthorized access!" });
  }

  try {
    await prisma.user.delete({ where: { id: userid } });

    return c.json({ message: "User deleted" });
  } catch (error) {
    return c.json({ message: "An error occured while deleting the user!" });
  }
};
