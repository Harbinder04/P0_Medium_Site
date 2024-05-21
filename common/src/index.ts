import z from 'zod';


//used by the backend
export const signupInput = z.object({
 email: z.string().email(),
 password: z.string().min(8),
 name: z.string()
})


export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})


export const createblogInput = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().default(false)
})


export const UpdateblogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional()
})


// used by the frontend
export type singninInput = z.infer<typeof signinInput>
export type singnupInput = z.infer<typeof signupInput>
export type createblogInput = z.infer<typeof createblogInput>
export type UpdateblogInput = z.infer<typeof UpdateblogInput>