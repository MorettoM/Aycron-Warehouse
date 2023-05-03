import { ThunkDispatch } from "redux-thunk";
import configureStore from "./configureStore";

const store = configureStore();

export type AppState = ReturnType<typeof store.getState>;
export type thunkDispatch = ThunkDispatch<AppState, any, any>;

export { store };
