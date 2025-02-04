import { ZodError, ZodIssue } from "zod";
import { errorSourceType, TGenericErrorResponce } from "./ErrorType";

const handleZodError = (err:ZodError):TGenericErrorResponce=>{
    const statusCode = 400
    const errorSource:errorSourceType = err.issues.map((issue:ZodIssue)=> {
        return {
            path:issue?.path[issue.path.length -1],
            message:issue.message
        }
    })

    return {
        statusCode,
        message:'validation error',
        errorSource
    }
}

export default handleZodError