import * as z from 'zod'
// Schema
export const registerSchema = z.object({
    name: z.string().nonempty('name required').min(3, '*Name must be at least 3 characters').max(20, '*Name cannot be more than 20 characters'),
    email: z.email('*Email is invalid'),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, '"Password must include uppercase, lowercase, number, and special character 🔒"'),
    rePassword: z.string(),
    dateOfBirth: z.coerce.date().refine(function (value) { return new Date().getFullYear() - value.getFullYear() >= 16 ? true : false; }, "*You must be at least 16").transform((date) => (`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`)),
    gender: z.enum(['male', 'female'], '*Gender is required'),
}).refine(data => data.password === data.rePassword, {
    message: "*Passwords must match",
    path: ["rePassword"]
});