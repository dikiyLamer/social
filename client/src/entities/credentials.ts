import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICredentials } from '../shared/interfaces/auth.interface';
import { authApi } from '../app/endpoints/auth';

const initialState: ICredentials = {
  isAuth: false,
  token: null,
};

export const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<ICredentials>) => payload,
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload: { payload } }) => {
        const { token } = payload!;
        state.isAuth = true;
        state.token = token;
      }
    );
  },
});

export const credentialsReducer = credentialsSlice.reducer;
