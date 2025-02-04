import { Router } from "express";
import { LocationController } from "./locationController";



const router = Router()

   router.post('/create-user-location',LocationController.createNewLocationController)
   router.get('/get-all-location',LocationController.getAllLocationController)
   router.get('/single-user-location/:id',LocationController.getSingleLocationController)
   router.get('/single-location/:id',LocationController.getSingleLocationBaseOnLocation)
export const locationRouter = router

