import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '~/features/auth/authSlice'
import userReducer from '~/features/user/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Sử dụng localStorage mặc định cho web
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist/es/constants'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user']
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Bỏ qua kiểm tra non-serializable
      },
    }),
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState> //mô tả cấu trúc của store đang quản lý {auth:...,user:...}
export type AppDispatch = typeof store.dispatch
export { store, persistor }
