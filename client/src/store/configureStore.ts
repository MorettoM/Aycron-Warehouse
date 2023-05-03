import { legacy_createStore as createStore, applyMiddleware, compose, Store } from "redux";

import thunk from "redux-thunk";
import buildRootReducer from "./reducers/index";
import { UserState } from "./reducers/user";
import { WarehouseState } from "./reducers/warehouse";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

type AppState = { user: UserState, warehouse: WarehouseState };

const initialState: AppState = {
  user: {
    isAuth: false,
    user: null,
  },
  warehouse: {
    loading: false,
    warehouses: []
  }
};

export default function configureStore(
  state: AppState = initialState
): Store<AppState> {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunk];

  return createStore(buildRootReducer(), state, composeEnhancers(applyMiddleware(...middlewares)));
}
