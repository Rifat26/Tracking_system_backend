import { NextFunction, Request, Response } from "express";
import CatchAsync from "../utils/CatchAsync";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../module/user/userModel";
import { ROLE__TYPE } from "../module/user/usrRoleType";
import App__error from "../Error/App__Error";

const auth = (...requiredRoles: ROLE__TYPE[]) => {
    return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) {
            throw new App__error(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }
        const Bearertokens = token.split(' ')[1]
        console.log(Bearertokens)
        const decoded = jwt.verify(Bearertokens, config.jwt__access__token__secret as string) as JwtPayload
        console.log(decoded)
        const {role,id} = decoded
        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            throw new App__error(httpStatus.NOT_FOUND, 'User not found.');
        }

      
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new App__error(httpStatus.UNAUTHORIZED, 'you are not authorized!')
        }
        req.user = decoded
        next();
    });
};

export default auth;