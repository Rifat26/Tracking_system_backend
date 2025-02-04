"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const App__Error_1 = __importDefault(require("./App__Error"));
const config_1 = __importDefault(require("../config"));
const handle__zod__error_1 = __importDefault(require("./handle__zod__error"));
const Mongoose__Validation__Error_1 = __importDefault(require("./Mongoose__Validation__Error"));
const mongoose__Cast__Error_1 = __importDefault(require("./mongoose__Cast__Error"));
const mongooseDuplicateErrors_1 = __importDefault(require("./mongooseDuplicateErrors"));
const globalErrorHandler = (err, req, res, next) => {
    // st deatult vlaue 
    let statusCode = 500;
    let message = "Something went wrong";
    let errorSource = [
        {
            path: '',
            message: 'somthing went wrong'
        }
    ];
    if (err instanceof zod_1.ZodError) {
        const ZodModifyError = (0, handle__zod__error_1.default)(err);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        statusCode = ZodModifyError.statusCode,
            message = ZodModifyError.message,
            errorSource = ZodModifyError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const mongooseErrorModify = (0, Mongoose__Validation__Error_1.default)(err);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        statusCode = mongooseErrorModify.statusCode,
            message = mongooseErrorModify.message,
            errorSource = mongooseErrorModify.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const mongooseCastError = (0, mongoose__Cast__Error_1.default)(err);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        statusCode = mongooseCastError.statusCode,
            message = mongooseCastError.message,
            errorSource = mongooseCastError.errorSource;
    }
    else if (err.code === 11000) {
        const mongooseDeplicateError = (0, mongooseDuplicateErrors_1.default)(err);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        statusCode = mongooseDeplicateError.statusCode,
            message = mongooseDeplicateError.message,
            errorSource = mongooseDeplicateError.errorSource;
    }
    else if (err instanceof App__Error_1.default) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode,
            message = err === null || err === void 0 ? void 0 : err.message,
            errorSource = [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message
                }
            ];
    }
    else if (err instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        message = err === null || err === void 0 ? void 0 : err.message,
            errorSource = [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message
                }
            ];
    }
    // main return error 
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSource,
        err,
        stack: config_1.default.node__env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : ''
    });
};
exports.default = globalErrorHandler;
