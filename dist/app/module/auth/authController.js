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
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SendResponce_1 = __importDefault(require("../../utils/SendResponce"));
const authService_1 = require("./authService");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginController = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield authService_1.authService.loginService(req.body);
    (0, SendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'A verification code has been sent to your email address.',
        data: null,
    });
}));
const verifyCodeController = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    const result = yield authService_1.authService.verifyCodeService(email, code);
    const { accessToken, refreshToken } = result;
    (0, SendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Login successful.',
        data: {
            accessToken,
            refreshToken,
        },
    });
}));
exports.AuthController = {
    loginController,
    verifyCodeController,
};
