"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationValidationSchema = void 0;
const zod_1 = require("zod");
exports.LocationValidationSchema = zod_1.z.object({
    user: zod_1.z.string(),
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number(),
    address: zod_1.z.object({
        country: zod_1.z.string().optional(),
        country_code: zod_1.z.string().optional(),
        state_district: zod_1.z.string().optional(),
        state: zod_1.z.string().optional(),
        town: zod_1.z.string().optional(),
    }).optional(), // Optional `address` object
});
exports.default = exports.LocationValidationSchema;
