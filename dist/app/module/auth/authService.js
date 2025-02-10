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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const App__Error_1 = __importDefault(require("../../Error/App__Error"));
const userModel_1 = require("../user/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const mailer_1 = __importDefault(require("../../utils/mailer"));
const generateCode = (length) => {
    const characters = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
};
const loginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findOne({ email: payload.email });
    // Check if the user exists
    if (!user) {
        throw new App__Error_1.default(http_status_1.default.NOT_FOUND, 'user not found.');
    }
    // Check if the user account is blocked
    if (user.isBlocked === true) {
        throw new App__Error_1.default(http_status_1.default.FORBIDDEN, 'This user account is currently blocked!');
    }
    const plainPassword = payload.password;
    const userHashPassword = user.password;
    console.log('userHashPassword', userHashPassword);
    const isPasswordValid = yield bcrypt_1.default.compare(plainPassword, userHashPassword);
    if (!isPasswordValid) {
        throw new App__Error_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials.');
    }
    const code = generateCode(6); // Example: 6-digit code
    yield userModel_1.User.findOneAndUpdate({ email: payload.email }, { loginCode: code, loginCodeExpiry: new Date(Date.now() + 5 * 60 * 1000) });
    try {
        yield (0, mailer_1.default)({
            to: user.email,
            subject: 'Login Verification Code',
            body: `<p>Your login verification code is: <strong>${code}</strong></p><p>This code will expire in 5 minutes.</p>`,
        });
    }
    catch (emailError) {
        console.error('Error sending email:', emailError);
        throw new App__Error_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error sending verification email.');
    }
});
const verifyCodeService = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findOne({ email });
    if (!user) {
        throw new App__Error_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    if (!user.loginCode || user.loginCode !== code) {
        throw new App__Error_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid verification code.');
    }
    if (user.loginCodeExpiry && user.loginCodeExpiry < new Date()) {
        yield userModel_1.User.findOneAndUpdate({ email }, { loginCode: null, loginCodeExpiry: null });
        throw new App__Error_1.default(http_status_1.default.UNAUTHORIZED, 'Verification code expired.');
    }
    yield userModel_1.User.findOneAndUpdate({ email }, { loginCode: null, loginCodeExpiry: null });
    const jwtPayload = {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt__access__token__secret, { expiresIn: '10d' });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt__refresh__token__secret, { expiresIn: '20d' });
    return { accessToken, refreshToken };
});
exports.authService = {
    loginService,
    verifyCodeService,
};
