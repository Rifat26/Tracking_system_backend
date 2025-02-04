"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mongooseDuplicateError = (error) => {
    const keyValue = error.keyValue || {};
    const key = Object.keys(keyValue)[0]; // Extract the duplicate key
    const value = keyValue[key]; // Extract the duplicate value
    const errorSource = [
        {
            path: key,
            message: `Duplicate value '${value}' for field '${key}'`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate key error',
        errorSource,
    };
};
exports.default = mongooseDuplicateError;
