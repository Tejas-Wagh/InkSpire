import {z} from "zod";

// auth types
 const signupParams=z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string(),
    profilePicture:z.string().optional()
})
 const signinParams=z.object({
    email:z.string().email(),
    password:z.string()
})

 const updateUserParams=z.object({
   username:z.string().optional(), 
   email:z.string().email().optional(), 
   password:z.string().optional(), 
})

export type signupType= z.infer<typeof signupParams>;
export type signinType=z.infer<typeof signinParams>;
export type updateUserType= z.infer<typeof updateUserParams>


// blog post types
 const inputBlogParams= z.object({
    title:z.string(),
    image:z.string(),
    description:z.string(),
    type:z.string(),
    authorId:z.string()
})

 const updateBlogParams=z.object({
    title:z.string(),
    description:z.string(),
    image:z.string(),
    type:z.string()
})

export type inputBlogTypes= z.infer<typeof inputBlogParams>
export type updateBlogTypes= z.infer<typeof updateBlogParams>


// comment types

const newCommentParams=z.object({
    content:z.string(),
    postId:z.string(),
    userId:z.string(),
    email:z.string().email(),
})

const updateCommentParams= z.object({
    content:z.string()
})

export type newCommentType=z.infer<typeof newCommentParams>
export type updateCommentType= z.infer<typeof newCommentParams>


