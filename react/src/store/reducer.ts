import type { Reducer } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";

const appReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});


const rootReducer: Reducer = (state: RootState, action) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;


export type RootSlices = keyof RootState;

export default rootReducer;
