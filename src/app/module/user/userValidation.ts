import { z } from "zod";

const usrValidation = z.object({
    body: z.object({
        name: z.string({ required_error: 'name is required!' }),
        email: z.string({ required_error: 'email is required!' }),
        password: z.string({ required_error: 'password is required!' }),
        isBlocked: z.boolean().optional().default(false),
        role: z.enum(['user', 'admin']).default('user'),
    }),
});

export default usrValidation;
