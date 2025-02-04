import { Router } from "express";
import { userRouter } from "../module/user/userRouter";
import { locationRouter } from "../module/location/locationRouter";

const router = Router()

    const blogWebsiteRouter = [
        {
            path:'/auth',
            router:userRouter,
        },
        {
            path:'/location',
            router:locationRouter,
        },
        
    ]

    blogWebsiteRouter.forEach(route => router.use(route.path,route.router))

export default router 