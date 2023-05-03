import { model, Schema, Document } from "mongoose";

export interface WarehouseDocument extends Document {
  name: string;
  code: string;
  address: string;
  state: string;
  county?: string;
  zip?: string;
  lngLat: string;
  image?: string;
  productsFile?: string;
}

const warehouseSchema = new Schema<WarehouseDocument>({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: false,
  },
  lngLat: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false
  },
  productsFile: {
    type: String,
    required: false
  }
});

export const Warehouse = model<WarehouseDocument>("Warehouse", warehouseSchema);

export default Warehouse;