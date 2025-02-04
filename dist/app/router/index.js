"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = require("../module/user/userRouter");
const locationRouter_1 = require("../module/location/locationRouter");
const router = (0, express_1.Router)();
const blogWebsiteRouter = [
    {
        path: '/auth',
        router: userRouter_1.userRouter,
    },
    {
        path: '/location',
        router: locationRouter_1.locationRouter,
    },
];
blogWebsiteRouter.forEach(route => router.use(route.path, route.router));
exports.default = router;
