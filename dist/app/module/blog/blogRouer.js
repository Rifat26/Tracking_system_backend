"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const blogController_1 = require("./blogController");
const DataValidation_1 = __importDefault(require("../../Middleware/DataValidation"));
const blogValidation_1 = __importDefault(require("./blogValidation"));
const auth_1 = __importDefault(require("../../Middleware/auth"));
const usrRoleType_1 = require("../user/usrRoleType");
const blogUpdateValidation_1 = __importDefault(require("./blogUpdateValidation"));
const router = (0, express_1.Router)();
router.post('/', (0, DataValidation_1.default)(blogValidation_1.default), (0, auth_1.default)(usrRoleType_1.USER__ROLE.user), blogController_1.blogController.createBlogController);
router.get('/', blogController_1.blogController.getAllBlogController);
router.patch('/:id', (0, auth_1.default)(usrRoleType_1.USER__ROLE.user), (0, DataValidation_1.default)(blogUpdateValidation_1.default), blogController_1.blogController.updateBlogController);
router.delete('/:id', (0, auth_1.default)(usrRoleType_1.USER__ROLE.user), blogController_1.blogController.deleteBlogController);
exports.blogRouter = router;
