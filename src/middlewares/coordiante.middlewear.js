import { ApiError } from "../utils/ApiError";
import Location from "../models/location.model";

export const checkLatAndLong=async (req,res,next)=>{
    const {latitude,longitude}=req.body;
    const isLatitude = latitude => isFinite(latitude) && Math.abs(latitude) <= 90;
    const isLongitude = longitude => isFinite(longitude) && Math.abs(longitude) <= 180;
    if(!isLatitude(latitude) && !isLongitude(longitude)){
        throw new  ApiError(400,"Wrong Coordinates");
    }
    const alreadyAssigned = await Location.findOne({longitude,latitude});
    if(alreadyAssigned){
        throw new ApiError(400,"Already Exist");
    }
    
    next();
    
}