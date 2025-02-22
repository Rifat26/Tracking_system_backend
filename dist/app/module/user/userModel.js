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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        validate: {
            validator: (value) => (0, isEmail_1.default)(value),
            message: '{VALUE} is not a valid email!',
        },
    },
    password: {
        type: String,
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    loginCode: {
        type: String,
        default: null,
    },
    loginCodeExpiry: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
userModelSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const slatRound = 12;
        const hashPassword = yield bcrypt_1.default.hash(this.password, slatRound);
        this.password = hashPassword;
    });
});
exports.User = (0, mongoose_1.model)('User', userModelSchema);
