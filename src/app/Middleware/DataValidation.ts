import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const DataValidation = (schema:AnyZodObject)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        console.log(req.body)
        try{
            await schema.parseAsync({
                body:req.body,
                cookies:req.cookies
            })
            next()
        }catch(err){
            next(err)
        }
    }
}

export default DataValidation