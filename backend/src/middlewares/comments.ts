import { Context, Next } from "hono";
import { contextType } from "../routes/user";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getPostsComments = async (c: Context<contextType>, next: Next) => {
  const postId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
  });

  return c.json(comments);
};

export const saveComment = async (c: Context<contextType>, next: Next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try{
  const newComment = await prisma.comment.create({
    data: {
      content: body.content,
      postId: body.postId,
      userId: body.userId,
      email: body.email,
      numberOfLikes: 0,
      likes: [],
    },
  });
    return c.json(newComment);
  } catch (error) {
    return c.json({ message: "An error occured!" });
  }
};

export const commentLike = async (c: Context<contextType>, next: Next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const commmentId = c.req.param("id");
  const amount = body.amount;
  const email = body.email;
  if (amount > 0) {
    await prisma.comment.update({
      where: {
        id: commmentId,
      },
      data: {
        numberOfLikes: {
          increment: amount,
        },
        likes: {
          push: email,
        },
      },
    });
  } else {
    const preComment = await prisma.comment.findFirst({
      where: { id: commmentId },
    });

    await prisma.comment.update({
      where: { id: commmentId },
      data: {
        numberOfLikes: {
          increment: amount,
        },
        likes: {
          set: preComment?.likes.filter((prevEmail) => prevEmail != email),
        },
      },
    });
  }

  return c.json({ message: amount > 0 ? "Liked" : "Unliked" });
};

export const updateContent = async (c: Context<contextType>) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const id = c.req.param("id");

  await prisma.comment.update({
    where: { id: id },
    data: { content: body.content },
  });

  return c.json({
    message: "Successfull!",
  });
};

export const deleteComment = async (c: Context<contextType>) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  await prisma.comment.delete({ where: { id: id } });

  const resData = await prisma.comment.findMany({ where: { id: id } });
  return c.json(resData);
};
