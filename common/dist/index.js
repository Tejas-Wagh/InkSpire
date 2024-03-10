"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// auth types
const signupParams = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    profilePicture: zod_1.z.string().optional()
});
const signinParams = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
const updateUserParams = zod_1.z.object({
    username: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().optional(),
});
// blog post types
const inputBlogParams = zod_1.z.object({
    title: zod_1.z.string(),
    image: zod_1.z.string(),
    description: zod_1.z.string(),
    type: zod_1.z.string(),
    authorId: zod_1.z.string()
});
const updateBlogParams = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    image: zod_1.z.string(),
    type: zod_1.z.string()
});
// comment types
const newCommentParams = zod_1.z.object({
    content: zod_1.z.string(),
    postId: zod_1.z.string(),
    userId: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
const updateCommentParams = zod_1.z.object({
    content: zod_1.z.string()
});
