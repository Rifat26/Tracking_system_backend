/* eslint-disable @typescript-eslint/no-unused-vars */
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/SendResponce";
import { UserService } from "./userService";


const usersController = CatchAsync(async (req,res,_next)=>{
    const result = await UserService.createUserService(req.body)
    sendResponce(res,{
        statusCode:201,
        success:true,
        message:"User registered successfully",
        data:result
    })
})



export const userController = {
    usersController
}