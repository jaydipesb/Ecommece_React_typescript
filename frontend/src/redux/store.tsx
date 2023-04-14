import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./reducers/index";

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);
export const store =  createStore(persistedReducer,composeEnhancers(applyMiddleware()))

export const persistor = persistStore(store)