"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseCastErrors = (error) => {
    const errorSource = [{
            path: error.path,
            message: error.message
        }];
    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: 'INVALID ID',
        errorSource
    };
};
exports.default = mongooseCastErrors;
