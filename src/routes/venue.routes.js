import {Router} from "express";
import { getAllAddress,getAddress,addAddressByUser,addAddressByGeo,updateAdress,removeAdress } from "../controllers/venue.controller";
import checkLatAndLong from "../middlewares/coordiante.middlewear.js";


const venueRouter = Router();

venueRouter.get("/locations")

venueRouter.get("/location:id")

venueRouter.post("/address")

venueRouter.post("/geo")

venueRouter.put("/updateAdress")

venueRouter.delete("/removeAdress")


export default venueRouter;