import { model, Schema } from "mongoose";
import { locationInterface, TaddressType } from "./locationInterface";

const addressSchema = new Schema<TaddressType>({
    country: { type: String },
    country_code: { type: String },
    county: { type: String },
    state: { type: String },
    state_district: { type: String },
    town: { type: String },
}, { _id: false });

const locationSchema = new Schema<locationInterface>({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: addressSchema
    }
}, {
    timestamps: true
})

export const location = model<locationInterface>('location', locationSchema)