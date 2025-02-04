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
exports.AdminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SendResponce_1 = __importDefault(require("../../utils/SendResponce"));
const adminService_1 = require("./adminService");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const blockUserController = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminService_1.AdminService.blockUserService(req.params.id);
    (0, SendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User blocked successfully",
        data: result
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteUserBlogController = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminService_1.AdminService.deleteUserBlogService(req.params.id);
    (0, SendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog deleted successfully",
        data: result
    });
}));
exports.AdminController = {
    blockUserController,
    deleteUserBlogController
};
