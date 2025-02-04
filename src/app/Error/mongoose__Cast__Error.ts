import mongoose from "mongoose";
import { TGenericErrorResponce } from "./ErrorType";

const mongooseCastErrors = (error: mongoose.Error.CastError):TGenericErrorResponce=>{
    const errorSource = [{
        path:error.path,
        message:error.message
    }]

    const statusCode = 400
    return {
        statusCode:statusCode,
        message:'INVALID ID',
        errorSource
    }
}

export default mongooseCastErrors