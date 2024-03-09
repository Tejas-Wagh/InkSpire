import { Context, ErrorHandler } from "hono";
import { contextType } from "../routes/user";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function newPost(c: Context<contextType>) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    await prisma.post.create({
      data: {
        image: body.image,
        title: body.title,
        description: body.description,
        date: new Date(),
        type: body.type,
        likes: [],
        totalLikes: 0,
        views: 0,
        authorId: c.get("userId"),
      },
    });

    return c.json({ message: "Post saved" });
  } catch (e) {
    return c.json({ e, message: "Error while posting a blog" });
  }
}

export async function editPost(c: Context<contextType>) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const id = c.req.param("id");

  try {
    const existingPost = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        image: body.image || existingPost?.image,
        title: body.title || existingPost?.title,
        description: body.description || existingPost?.description,
        type: body.type || existingPost?.type,
      },
    });

    return c.json({ message: "Post updated" });
  } catch (e) {
    return c.json({ message: "error while updating" });
  }
}

export const getAllPosts = async (c: Context<contextType>) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        author: {
          select: {
            username: true,
          },
        },
        authorId: true,
        date: true,
        description: true,
        id: true,
        image: true,
        likes: true,
        title: true,
        totalLikes: true,
        type: true,
        views: true,
      },
    });
    return c.json(posts);
  } catch (error) {
    c.status(403);
    return c.json({ message: "An error occured!" });
  }
};

export const getPostsByType = async (c: Context<contextType>) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const type = c.req.param("type");

  try {
    const posts = await prisma.post.findMany({
      where: {
        type: type,
      },
      select: {
        author: {
          select: {
            username: true,
          },
        },
        authorId: true,
        date: true,
        description: true,
        id: true,
        image: true,
        likes: true,
        title: true,
        totalLikes: true,
        type: true,
        views: true,
      },
    });

    return c.json(posts);
  } catch (error) {
    return c.json({message:"An errror occured"})
  }
};

export const getPost = async (c: Context<contextType>) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const post = await prisma.post.update({
      where: { id: id },
      data: {
        views: { increment: 1 },
      },
      select: {
        author: {
          select: {
            username: true,
          },
        },
        authorId: true,
        date: true,
        description: true,
        id: true,
        image: true,
        likes: true,
        title: true,
        totalLikes: true,
        type: true,
        views: true,
      },
    });

    const postComments = await prisma.comment.findMany({
      where: {
        postId: id,
      },
    });
    return c.json({ post, postComments });
  } catch (error) {
    return c.json({ message: "An error occured!" });
  }
};

export const deletePost = async (c: Context<contextType>) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    await prisma.post.delete({ where: { id: id } });
    return c.json({ message: "Post Deleted!" });
  } catch (error) {
    return c.json({ message: "An error occured" });
  }
};

export const handleLike = async (c: Context<contextType>) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  const body = await c.req.json();

  const amount = Number(body.amount);

  try {
    if (amount > 0) {
      await prisma.post.update({
        where: { id: id },
        data: {
          totalLikes: {
            increment: amount,
          },
          likes: {
            push: body.email,
          },
        },
      });
    } else {
      const existingPost = await prisma.post.findFirst({
        where: { id: id },
        select: {
          likes: true,
        },
      });

      await prisma.post.update({
        where: { id: id },
        data: {
          totalLikes: {
            increment: amount,
          },
          likes: {
            set: existingPost?.likes.filter((email) => email != body.email),
          },
        },
      });
    }

    return c.json({ message: "Success!" });
  } catch (error) {
    return c.json({ message: "An error occured" });
  }
};
