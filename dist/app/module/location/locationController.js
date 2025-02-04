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
exports.LocationController = void 0;
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SendResponce_1 = __importDefault(require("../../utils/SendResponce"));
const locationService_1 = require("./locationService");
const createNewLocationController = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield locationService_1.LocationService.createNewLocationService(req.body);
    (0, SendResponce_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Create new location successfully",
        data: result
    });
}));
const getAllLocationController = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield locationService_1.LocationService.getAllLocationService();
    (0, SendResponce_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "get all location successfully",
        data: result
    });
}));
const getSingleLocationController = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield locationService_1.LocationService.getSingleLocationService(id);
    (0, SendResponce_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "get all single User Information showen successfully",
        data: result
    });
}));
const getSingleLocationBaseOnLocation = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const reuslt = yield locationService_1.LocationService.getLocationSingleInformation(id);
    (0, SendResponce_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "get single location retrive successfully",
        data: reuslt
    });
}));
exports.LocationController = {
    createNewLocationController,
    getAllLocationController,
    getSingleLocationController,
    getSingleLocationBaseOnLocation
};
