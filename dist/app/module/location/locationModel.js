"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = void 0;
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    country: { type: String },
    country_code: { type: String },
    county: { type: String },
    state: { type: String },
    state_district: { type: String },
    town: { type: String },
}, { _id: false });
const locationSchema = new mongoose_1.Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: addressSchema
    }
}, {
    timestamps: true
});
exports.location = (0, mongoose_1.model)('location', locationSchema);
