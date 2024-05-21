import z from 'zod';
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createblogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
}, {
    title: string;
    content: string;
    published?: boolean | undefined;
}>;
export declare const UpdateblogInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
    published?: boolean | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
    published?: boolean | undefined;
}>;
export type singninInput = z.infer<typeof signinInput>;
export type singnupInput = z.infer<typeof signupInput>;
export type createblogInput = z.infer<typeof createblogInput>;
export type UpdateblogInput = z.infer<typeof UpdateblogInput>;
