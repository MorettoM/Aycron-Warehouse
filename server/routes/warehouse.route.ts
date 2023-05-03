import WarehouseControllers from "@controllers/warehouse.controllers";
import { Router } from "express";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = Router();

router.get("/", WarehouseControllers.getWarehouses);

//  Input : name, code, zip, address, county, state via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400,500.
router.post("/", WarehouseControllers.postWarehouse);

router.delete("/:id", WarehouseControllers.deleteWarehouse);

router.get("/nearest", adminMiddleware.isAdmin, WarehouseControllers.getNearestWarehouses);



export default router;
