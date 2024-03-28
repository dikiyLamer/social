import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICurrentUser } from '../shared/interfaces/auth.interface';
import { userApi } from '../app/endpoints/user';

interface IAppUser {
  currentUser: ICurrentUser;
  pageUser: ICurrentUser;
}

const initialState: IAppUser = {
  currentUser: {
    uid: '',
    email: '',
    firstName: '',
    secondName: '',
  },
  pageUser: {
    uid: '',
    email: '',
    firstName: '',
    secondName: '',
  },
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userPage: (state, { payload }: PayloadAction<ICurrentUser>) => {
      state.pageUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.me.matchFulfilled, (state, { payload: { payload } }) => {
      state.currentUser = payload!;
    });
  },
});

export const userReducer = userSlice.reducer;
