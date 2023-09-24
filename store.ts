import bookStoreReducer from './features/BookSlice';
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['books']
};

const reducer = combineReducers({
    books: bookStoreReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export default store;