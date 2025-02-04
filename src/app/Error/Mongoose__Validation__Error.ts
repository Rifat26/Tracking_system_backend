import mongoose from "mongoose";
import { errorSourceType, TGenericErrorResponce } from "./ErrorType";

const MongooseValidationError = (error: mongoose.Error.ValidationError):TGenericErrorResponce => {
    const errorSource: errorSourceType = Object.values(error.errors).map(
        (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: value?.path,
                message: value.message,
            }
        });
        const statusCode = 400
    return {
        statusCode:statusCode,
        message:'validation Error',
        errorSource
    }

};

export default MongooseValidationError;