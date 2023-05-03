import { Warehouse, deleteWarehouse as deleteOne, getAllWarehouses as getAll, postWarehouse as post } from "../actions/warehouse";
import { Dispatch } from "redux";

import {
  getAllWarehouses,
  deleteWarehouse,
  postWarehouse,
  getNearestWarehouses,
} from "../../api/index";

export const attemptGetWarehosues =
  () => (dispatch: Dispatch) =>
    getAllWarehouses().then(({ data }) => {
      dispatch(getAll(data.warehouses));
    });

export const attemptDelete = (id: string) => (dispatch: Dispatch) =>
  deleteWarehouse(id)
    .then(({ data }) => {
      dispatch(deleteOne(data.warehouses));
    })

export const attemptCreate = (warehouse: Warehouse) => (dispatch: Dispatch) => postWarehouse(warehouse).then(({ data }) => {
	dispatch(post(data.warehouses));
})

export const attemptGetNearest =
  (address: string) => (dispatch: Dispatch) =>
    getNearestWarehouses(address).then(({ data }) => {
      return data;
    });
