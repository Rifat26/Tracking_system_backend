"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponce = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data === null || data === void 0 ? void 0 : data.message,
        data: data.data
    });
};
exports.default = sendResponce;
