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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const locationModel_1 = require("./locationModel");
const createNewLocationService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield locationModel_1.location.create(payload);
    return result;
});
const getAllLocationService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield locationModel_1.location.find({}).populate('user');
    return result;
});
const getSingleLocationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield locationModel_1.location.find({
        user: id,
    }).populate('user');
    return result;
});
const getLocationSingleInformation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield locationModel_1.location.findById(id);
    return result;
});
const deleteLocationService = () => {
};
exports.LocationService = {
    createNewLocationService,
    getAllLocationService,
    getSingleLocationService,
    deleteLocationService,
    getLocationSingleInformation
};
