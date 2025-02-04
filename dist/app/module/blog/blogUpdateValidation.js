"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const blogUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        author: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional()
    })
});
exports.default = blogUpdateValidationSchema;
