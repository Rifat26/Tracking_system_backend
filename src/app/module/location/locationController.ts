
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/SendResponce";
import { LocationService } from "./locationService";

const createNewLocationController = CatchAsync(async (req, res, next) => {
    const result = await LocationService.createNewLocationService(req.body)
    sendResponce(res, {
        statusCode: 201,
        success: true,
        message: "Create new location successfully",
        data: result
    })
})
const getAllLocationController = CatchAsync(async (req, res, next) => {
    const result = await LocationService.getAllLocationService()
    sendResponce(res, {
        statusCode: 200,
        success: true,
        message: "get all location successfully",
        data: result
    })
})

const getSingleLocationController = CatchAsync(async(req , res , next)=>{
    const id = req.params.id
    const result =await LocationService.getSingleLocationService(id)
    sendResponce(res, {
        statusCode: 200,
        success: true,
        message: "get all single User Information showen successfully",
        data: result
    })
})

const getSingleLocationBaseOnLocation = CatchAsync(async(req , res ,next)=>{
    const id = req.params.id 
    const reuslt = await LocationService.getLocationSingleInformation(id)
    sendResponce(res,{
        statusCode:200,
        success:true ,
        message:"get single location retrive successfully",
        data:reuslt
    })
})

export const LocationController = {
    createNewLocationController,
    getAllLocationController,
    getSingleLocationController,
    getSingleLocationBaseOnLocation
}