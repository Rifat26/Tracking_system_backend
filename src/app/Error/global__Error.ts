/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import AppError from "./App__Error";
import config from "../config";
import handleZodError from "./handle__zod__error";
import { errorSourceType } from "./ErrorType";
import MongooseValidationError from "./Mongoose__Validation__Error";
import mongooseCastErrors from "./mongoose__Cast__Error";
import mongooseDuplicateError from "./mongooseDuplicateErrors";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // st deatult vlaue 
    let statusCode =  500;
    let message =  "Something went wrong";
    let errorSource: errorSourceType = [
        {
            path: '',
            message: 'somthing went wrong'
        }
    ]

    if (err instanceof ZodError) {
        const ZodModifyError = handleZodError(err)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        statusCode = ZodModifyError.statusCode,
            message = ZodModifyError.message,
            errorSource = ZodModifyError.errorSource

    } else if (err?.name === 'ValidationError') {
        const mongooseErrorModify = MongooseValidationError(err)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        statusCode = mongooseErrorModify.statusCode,
            message = mongooseErrorModify.message,
            errorSource = mongooseErrorModify.errorSource

    } else if (err?.name === 'CastError') {
        const mongooseCastError = mongooseCastErrors(err)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        statusCode = mongooseCastError.statusCode,
            message = mongooseCastError.message,
            errorSource = mongooseCastError.errorSource

    } else if (err.code === 11000) {
        const mongooseDeplicateError = mongooseDuplicateError(err)
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            statusCode = mongooseDeplicateError.statusCode,
            message = mongooseDeplicateError.message,
            errorSource = mongooseDeplicateError.errorSource

    }else if(err instanceof AppError){
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        statusCode = err?.statusCode,
        message = err?.message,
        errorSource = [
            {
                path:'',
                message:err?.message
            }
        ]
    }else if(err instanceof Error){
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        message = err?.message,
        errorSource = [
            {
                path:'',
                message:err?.message
            }
        ]
    }



    // main return error 
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSource,
        err,
        stack: config.node__env === 'development' ? err?.stack : ''
    });
};

export default globalErrorHandler;


