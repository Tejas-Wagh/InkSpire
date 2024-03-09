import { Hono } from "hono";
import { contextType } from "./user";
import { verifyUser } from "../middlewares/auth";
import { deletePost, editPost, getAllPosts, getPost, getPostsByType, handleLike, newPost } from "../middlewares/blog";
import { commentLike, deleteComment, getPostsComments, saveComment, updateContent } from "../middlewares/comments";
// import {inputBlogTypes,updateBlogTypes} from "@tejas09/medium"

export const router = new Hono<contextType>();

router.get("/posts",getAllPosts);
router.get("/posts/:type",getPostsByType);
router.get("/post/:id",getPost);
router.post("/edit/:id",verifyUser,editPost);
router.post("/new",verifyUser,newPost);
router.delete("/delete/:id",verifyUser,deletePost);
router.put("/post/like/:id",handleLike)
router.get("/post/comments/:id",getPostsComments);
router.post("/post/comments/:id",saveComment);
router.post("/post/comment/:id", commentLike)
router.put("/post/comment/:id",updateContent);
router.delete("/post/comment/:id",deleteComment);
