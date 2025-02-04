"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const DataValidation_1 = __importDefault(require("../../Middleware/DataValidation"));
const userValidation_1 = __importDefault(require("./userValidation"));
const userController_1 = require("./userController");
const authValidation_1 = __importDefault(require("../auth/authValidation"));
const authController_1 = require("../auth/authController");
const router = (0, express_1.Router)();
router.post('/register', (0, DataValidation_1.default)(userValidation_1.default), userController_1.userController.usersController);
router.post('/login', (0, DataValidation_1.default)(authValidation_1.default), authController_1.AuthController.loginController);
exports.userRouter = router;
