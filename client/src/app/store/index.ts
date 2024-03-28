import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from '../endpoints';
import { credentialsReducer, credentialsSlice } from '../../entities/credentials';
import { userReducer } from '../../entities/user';
import { clientCookies } from '../../shared/utils/cookie';

export const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  credentials: credentialsReducer,
  user: userReducer,
});

const geStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

  const token = clientCookies.getData('token');
  if (token) {
    store.dispatch(credentialsSlice.actions.setCredentials({ token, isAuth: true }));
  }

  return store;
};

export const store = geStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
