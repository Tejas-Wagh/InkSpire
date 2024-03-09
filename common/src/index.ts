import {z} from "zod";

export const signupParams=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string()
})
export const signinParams=z.object({
    email:z.string().email(),
    password:z.string()
})

export const inputBlogParams= z.object({
    title:z.string(),
    content:z.string(),
    authorId:z.string()
})

export const updateBlogParams=z.object({
    title:z.string(),
    content:z.string()
})

export type signupType= z.infer<typeof signupParams>;
export type signinType=z.infer<typeof signinParams>;
export type inputBlogTypes= z.infer<typeof inputBlogParams>
export type updateBlogTypes= z.infer<typeof updateBlogParams>