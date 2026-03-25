import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type UserState = {
    isAuth: boolean;
};

const initialState: UserState = {
    isAuth: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        }
    }
});

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;

export const selectIsAuth = (state: RootState) => state.user.isAuth;