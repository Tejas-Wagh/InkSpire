"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogParams = exports.inputBlogParams = exports.signinParams = exports.signupParams = void 0;
const zod_1 = require("zod");
exports.signupParams = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.signinParams = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.inputBlogParams = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    authorId: zod_1.z.string()
});
exports.updateBlogParams = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
