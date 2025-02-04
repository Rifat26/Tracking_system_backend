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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const App__Error_1 = __importDefault(require("../../Error/App__Error"));
const userModel_1 = require("../user/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const loginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findOne({ email: payload.email });
    // Check if the user exists
    if (!user) {
        throw new App__Error_1.default(http_status_1.default.NOT_FOUND, 'user not found.');
    }
    // Check if the user account is blocked
    if (user.isBlocked === true) {
        throw new App__Error_1.default(http_status_1.default.FORBIDDEN, 'This user account is currently blocked!');
    }
    const plainPassword = payload.password;
    const userHashPassword = user.password;
    const isPasswordValid = yield bcrypt_1.default.compare(plainPassword, userHashPassword);
    if (!isPasswordValid) {
        throw new App__Error_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials.');
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
    };
    // Generate tokens
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt__access__token__secret, { expiresIn: '10d' });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt__refresh__token__secret, { expiresIn: '20d' });
    // Return tokens
    return {
        accessToken,
        refreshToken,
    };
});
exports.authService = {
    loginService
};
