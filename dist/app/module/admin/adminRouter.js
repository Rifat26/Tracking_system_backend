"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const adminController_1 = require("./adminController");
const auth_1 = __importDefault(require("../../Middleware/auth"));
const usrRoleType_1 = require("../user/usrRoleType");
const router = (0, express_1.Router)();
router.post('/users/:id/block', (0, auth_1.default)(usrRoleType_1.USER__ROLE.admin), adminController_1.AdminController.blockUserController);
router.delete('/blogs/:id', (0, auth_1.default)(usrRoleType_1.USER__ROLE.admin), adminController_1.AdminController.deleteUserBlogController);
exports.adminRouter = router;
