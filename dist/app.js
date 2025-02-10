"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const global__Error_1 = __importDefault(require("./app/Error/global__Error"));
const not__found_1 = __importDefault(require("./app/Error/not__found"));
const router_1 = __importDefault(require("./app/router"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'https://tracking-system-zeta.vercel.app',
        'http://localhost:5173',
    ], // Allow only your frontend
    credentials: true, // If you need cookies or authentication
}));
// router
app.use('/api', router_1.default);
app.get('/', (req, res) => {
    res.send('server is running ...!');
});
app.use(global__Error_1.default);
app.use(not__found_1.default);
exports.default = app;
