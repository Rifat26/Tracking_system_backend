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
const nodemailer_1 = __importDefault(require("nodemailer"));
const index_1 = __importDefault(require("../config/index"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: index_1.default.emailSender.email,
        pass: index_1.default.emailSender.app_pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, body, attachmentPath, }) {
    const attachment = attachmentPath
        ? {
            filename: path_1.default.basename(attachmentPath),
            content: fs_1.default.readFileSync(attachmentPath),
            encoding: 'base64',
        }
        : undefined;
    const mailOptions = {
        from: '"Location Track" <rifat@gmail.com>',
        to,
        subject,
        html: body,
        attachments: attachment ? [attachment] : [],
    };
    yield transporter.sendMail(mailOptions);
});
exports.default = sendMail;
