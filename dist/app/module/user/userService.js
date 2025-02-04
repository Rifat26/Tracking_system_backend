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
exports.UserService = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const http_status_1 = __importDefault(require("http-status"));
const App__Error_1 = __importDefault(require("../../Error/App__Error"));
const userModel_1 = require("./userModel");
const createUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exists
    const isUserExist = yield userModel_1.User.findOne({ email: payload.email });
    if (isUserExist) {
        throw new App__Error_1.default(http_status_1.default.BAD_REQUEST, 'This user already exists!');
    }
    // Create the user
    const newUser = yield userModel_1.User.create(payload);
    // Convert document to object and remove sensitive fields
    const result = newUser.toObject();
    delete result.password;
    delete result.role;
    delete result.isBlocked;
    return result;
});
exports.UserService = {
    createUserService
};
