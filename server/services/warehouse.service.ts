import { Warehouse, WarehouseDocument } from "@models/warehouse.model";

export const getWarehouses = async () => await Warehouse.find();

export const createWarehouse = ({
  name,
  code,
  address,
  state,
  county,
  zip,
  lngLat,
  image,
  productsFile
}: {
  name: string;
  code: string;
  address: string;
  state: string;
  county?: string;
  zip?: string;
  lngLat: string;
  image?: string;
  productsFile?: string;
}) => new Warehouse({ 
  name,
  code,
  address,
  state,
  county,
  zip,
  lngLat,
  image,
  productsFile
 });


export const deleteWarehouseById = async (id: string) => await Warehouse.findByIdAndDelete(id);

export const findWarehouseByCode = async (code: string) => await Warehouse.findOne({
  code
});

export const saveWarehouse = async (warehouse: WarehouseDocument) => await warehouse.save();


export default {
  getWarehouses,
  createWarehouse,
  deleteWarehouseById,
  findWarehouseByCode,
  saveWarehouse
};
