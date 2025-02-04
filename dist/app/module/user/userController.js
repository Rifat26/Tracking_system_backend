"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SendResponce_1 = __importDefault(require("../../utils/SendResponce"));
const userService_1 = require("./userService");
const usersController = (0, CatchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService_1.UserService.createUserService(req.body);
    (0, SendResponce_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: result
    });
}));
exports.userController = {
    usersController
};
