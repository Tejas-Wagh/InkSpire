import { z } from "zod";
declare const signupParams: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    profilePicture: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
    profilePicture?: string | undefined;
}, {
    username: string;
    email: string;
    password: string;
    profilePicture?: string | undefined;
}>;
declare const signinParams: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
declare const updateUserParams: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
}, {
    username?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
}>;
export type signupType = z.infer<typeof signupParams>;
export type signinType = z.infer<typeof signinParams>;
export type updateUserType = z.infer<typeof updateUserParams>;
declare const inputBlogParams: z.ZodObject<{
    title: z.ZodString;
    image: z.ZodString;
    description: z.ZodString;
    type: z.ZodString;
    authorId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    title: string;
    image: string;
    description: string;
    authorId: string;
}, {
    type: string;
    title: string;
    image: string;
    description: string;
    authorId: string;
}>;
declare const updateBlogParams: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    image: z.ZodString;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    title: string;
    image: string;
    description: string;
}, {
    type: string;
    title: string;
    image: string;
    description: string;
}>;
export type inputBlogTypes = z.infer<typeof inputBlogParams>;
export type updateBlogTypes = z.infer<typeof updateBlogParams>;
declare const newCommentParams: z.ZodObject<{
    content: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    content: string;
    postId: string;
    userId: string;
}, {
    email: string;
    content: string;
    postId: string;
    userId: string;
}>;
export type newCommentType = z.infer<typeof newCommentParams>;
export type updateCommentType = z.infer<typeof newCommentParams>;
export {};
