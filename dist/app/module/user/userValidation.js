"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const usrValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required!' }),
        email: zod_1.z.string({ required_error: 'email is required!' }),
        password: zod_1.z.string({ required_error: 'password is required!' }),
        isBlocked: zod_1.z.boolean().optional().default(false),
        role: zod_1.z.enum(['user', 'admin']).default('user'),
    }),
});
exports.default = usrValidation;
