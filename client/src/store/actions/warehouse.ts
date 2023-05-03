export const GET_WAREHOUSES = "GET_WAREHOUSES";
export const DELETE_WAREHOUSE = "DELETE_WAREHOUSE";
export const POST_WAREHOUSE = "POST_WAREHOUSE";

export type Warehouse = {
	name: string;
	code: string;
	address: string;
	state: string;
	county?: string;
	zip?: string;
	lngLat: string;
	image?: string;
	_id: string;
	productsFile?: string;
};

export type WarehouseAction<T> = {
  type: string;
  payload?: T;
};

export function getAllWarehouses(warehouses: Warehouse[] ): WarehouseAction<Warehouse[]> {
  return {
    type: GET_WAREHOUSES,
	payload: warehouses
  };
}

export function postWarehouse(warehouses: Warehouse[]): WarehouseAction<Warehouse[]> {
  return {
    type: POST_WAREHOUSE,
    payload: warehouses,
  };
}

export function deleteWarehouse(warehouses: Warehouse[]): WarehouseAction<Warehouse[]> {
	return {
	  type: DELETE_WAREHOUSE,
	  payload: warehouses,
	};
  }
  