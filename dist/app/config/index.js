"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    node__env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoose__connection: process.env.MONGOOSE_CONNECTION_URL,
    jwt__access__token__secret: process.env.JWT__ACCESS__SECRET__TOKEN,
    jwt__refresh__token__secret: process.env.JWT__REFRESH__SECRET__TOKEN,
};
