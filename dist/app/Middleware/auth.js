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
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const userModel_1 = require("../module/user/userModel");
const App__Error_1 = __importDefault(require("../Error/App__Error"));
const auth = (...requiredRoles) => {
    return (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new App__Error_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        const Bearertokens = token.split(' ')[1];
        console.log(Bearertokens);
        const decoded = jsonwebtoken_1.default.verify(Bearertokens, config_1.default.jwt__access__token__secret);
        console.log(decoded);
        const { role, id } = decoded;
        // Check if user exists
        const user = yield userModel_1.User.findById(id);
        if (!user) {
            throw new App__Error_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new App__Error_1.default(http_status_1.default.UNAUTHORIZED, 'you are not authorized!');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
