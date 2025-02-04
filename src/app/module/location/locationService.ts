import { locationInterface } from "./locationInterface"
import { location } from "./locationModel"

const createNewLocationService = async (payload: locationInterface) => {
    const result = await location.create(payload)
    return result
}

const getAllLocationService = async () => {
    const result = await location.find({}).populate('user')
    return result

}

const getSingleLocationService = async (id: string) => {
    const result = await location.find({
        user: id,
    }).populate('user');
    return result;
};

const getLocationSingleInformation = async(id:string)=>{
    const result = await location.findById(id)
    return result
}

const deleteLocationService = () => {

}

export const LocationService = {
    createNewLocationService,
    getAllLocationService,
    getSingleLocationService,
    deleteLocationService,
    getLocationSingleInformation
}

