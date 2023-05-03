import { combineReducers } from "redux";

import userReducer from "./user";
import warehouseReducer from "./warehouse";

const buildRootReducer = () =>
  combineReducers({
    user: userReducer,
    warehouse: warehouseReducer
  });

export default buildRootReducer;
