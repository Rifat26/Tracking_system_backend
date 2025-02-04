import { Types } from "mongoose"

export type TaddressType = {
    country: string;
    country_code: string;
    county: string;
    state: string;
    state_district: string;
    town: string;
}

export type locationInterface = {
    user: Types.ObjectId,
    latitude: number,
    longitude: number,
    address: TaddressType
}