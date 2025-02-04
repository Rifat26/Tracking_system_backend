"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongooseValidationError = (error) => {
    const errorSource = Object.values(error.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: 'validation Error',
        errorSource
    };
};
exports.default = MongooseValidationError;
