"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.DoctorModel = void 0;
const DoctorSchema_1 = __importDefault(require("./DoctorSchema"));
exports.DoctorModel = DoctorSchema_1.default;
const UserSchema_1 = __importDefault(require("./UserSchema"));
exports.UserModel = UserSchema_1.default;
