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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, 'MyImages'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '---' + file.originalname);
    },
});
const doctorRouter = (0, express_1.Router)();
doctorRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const newDoctor = new DoctorModel({
        // 	name: 'Dr. John Doe',
        // 	email: 'drJohnDoe@gmail.com',
        // 	registrationNumber: '123456789',
        // 	walletAddress: '0x123456789',
        // 	description: 'Dr. John Doe is a doctor',
        // 	imageUrl: 'https://www.google.com',
        // });
        // await newDoctor.save();
        res.send('Express + TypeScript Server');
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = doctorRouter;
