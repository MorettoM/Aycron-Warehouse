import { DELETE_WAREHOUSE, GET_WAREHOUSES, POST_WAREHOUSE, Warehouse, WarehouseAction } from "../actions/warehouse";

export type WarehouseState = {
	loading: boolean,
	warehouses: Warehouse[]
};

const initialState: WarehouseState = {
	loading: false,
	warehouses: []
};

export default function warehouse(state = initialState, action: WarehouseAction<any>): WarehouseState {
  switch (action.type) {
    case GET_WAREHOUSES:
      return {
        loading: false,
        warehouses: action.payload,
      };
    case DELETE_WAREHOUSE:
      return {
        warehouses: action.payload,
        loading: false
      };
    case POST_WAREHOUSE:
      return {
        loading: false,
        warehouses: action.payload,
      };
    default:
      return state;
  }
}
