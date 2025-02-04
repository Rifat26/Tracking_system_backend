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
exports.blogController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SendResponce_1 = __importDefault(require("../../utils/SendResponce"));
const blogService_1 = require("./blogService");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createBlogController = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = req.user;
    console.log(user);
    const result = yield blogService_1.blogService.createBlogService(req.body, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    (0, SendResponce_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllBlogController = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogService_1.blogService.getAllBlogService(req.query);
    (0, SendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blogs fetched successfully",
        data: result
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateBlogController = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield blogService_1.blogService.updateBlogService(payload, req === null || req === void 0 ? void 0 : req.params.id);
    (0, SendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog updated successfully",
        data: result
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteBlogController = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield blogService_1.blogService.deleteBlogService(id);
    (0, SendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog deleted successfully",
        data: result
    });
}));
exports.blogController = {
    createBlogController,
    getAllBlogController,
    updateBlogController,
    deleteBlogController,
};
