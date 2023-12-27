import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: any;
}

const initialState: UserState = {
  user: '로그인을 해주세요!',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = '로그인을 해주세요!';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
export type RootState = {
  user: ReturnType<typeof userSlice.reducer>;
};
