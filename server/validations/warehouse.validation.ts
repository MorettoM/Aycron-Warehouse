import Joi from "joi";
import { WarehouseDocument } from "@models/warehouse.model";

export function validateWarehouse(
  warehouse: Pick<WarehouseDocument, "name" | "address" | "code" | "zip" | "county" | "state" | "image" | "productsFile">
) {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    zip: Joi.string(),
    code: Joi.string().required(),
    county: Joi.string(),
    state: Joi.string().required(),
    image: Joi.string(),
    productsFile: Joi.string()
  });

  return schema.validate(warehouse);
}
