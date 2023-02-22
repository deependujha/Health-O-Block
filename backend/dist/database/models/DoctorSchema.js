"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DoctorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
});
const DoctorModel = (0, mongoose_1.model)('DoctorModel', DoctorSchema);
exports.default = DoctorModel;
