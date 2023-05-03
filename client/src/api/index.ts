import { Credentials, User } from "src/store/actions/user";
import http from "../services/httpService";
import { Warehouse } from "src/store/actions/warehouse";

const postLogin = (credentials: Credentials) =>
  http.post<{ user: User }>("/auth/login", credentials);

const postLogout = () => http.post<void>("/auth/logout");

const postUser = (user: User) => http.post<void>("/user/register", user);

const getUser = () => http.get<{ user: User }>("/user");

const getAllWarehouses = () => http.get<{ warehouses: Warehouse[] }>("/warehouse");

const getNearestWarehouses = (address: string) => http.get<{ nearest: any[], addressLngLat: { lng: string; lat: string} }>(`/warehouse/nearest?address=${encodeURI(address)}`);

const postWarehouse = (warehouse: Warehouse) => http.post<{ warehouses: Warehouse[] }>("/warehouse", warehouse);

const deleteWarehouse = (code: string) => http.delete<{ warehouses: Warehouse[] }>(`/warehouse/${code}`);

export {
  postLogin,
  postLogout,
  postUser,
  getUser,
  getAllWarehouses,
  deleteWarehouse,
  postWarehouse,
  getNearestWarehouses
};
