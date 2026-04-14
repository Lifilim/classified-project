import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type User = {
    id: string;
    phone: string;
    name: string;
    avatar?: string;
    city?: string;
    rating: number;
};

type UserState = {
    token: string | null;
    user: User | null;
};

const initialState: UserState = {
    token: localStorage.getItem("token"),
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (
            state: UserState,
            action: PayloadAction<{ token: string; user: User }>,
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
    }
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;

export const selectIsAuth = (state: RootState) => state.user.token !== null;
export const selectToken = (state: RootState) => state.user.token;
export const selectUser = (state: RootState) => state.user.user;
