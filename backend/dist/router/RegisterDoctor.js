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
const models_1 = require("../database/models");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../MyImages/doctors'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '---' + file.originalname);
    },
});
const doctorRouter = (0, express_1.Router)();
doctorRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uploadImage = (0, multer_1.default)({ storage }).single('image');
        uploadImage(req, res, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                // these lines will be executed only if there's an error
                if (!req.file) {
                    return res.send('please select an image to upload');
                }
                else if (err instanceof multer_1.default.MulterError) {
                    return res.send(err);
                }
                else if (err) {
                    return res.send(err);
                }
                else {
                    const { name, email, walletAddress, description } = req.body;
                    const newDoctor = new models_1.DoctorModel({
                        name,
                        email,
                        walletAddress,
                        description,
                        imageUrl: req.file.filename,
                    });
                    yield newDoctor.save();
                    return res.send('image uploaded successfully');
                }
            });
        });
    }
    catch (err) {
        return res.send(err);
    }
}));
exports.default = doctorRouter;
