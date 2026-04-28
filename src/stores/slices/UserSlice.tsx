import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, ActiveUserState } from "../../types/UserStateType";

import { authApi } from '../../api/authAPI';
import { LoginDTO } from "../../types/LoginDTOType";
import { RegisterDTO } from "../../types/RegisterDTOType";
import { User } from "../../types/UserType";


const initialState: UserState = {
    token: localStorage.getItem("token"),
    user: null,
};

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (dto: LoginDTO, { rejectWithValue }) => {
        try {
            const data = await authApi.login(dto);
            localStorage.setItem("token", data.token);
            console.log('Token saved:', data.token);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "bad login");
        }
    }
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (dto: RegisterDTO, { rejectWithValue }) => {
        try {
            const data = await authApi.register(dto);
            localStorage.setItem("token", data.token);
            console.log('Token saved:', data.token);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "bad register");
        }
    }
);

// export const logoutThunk = createAsyncThunk(
//     "auth/logout",
//     async () => {
//         localStorage.removeItem("token");
//         console.log('Token removed');
//     }
// );


export const updateUserThunk = createAsyncThunk(
    '/auth/profile',
    async (data: { name: string }) => {
        return await authApi.updateProfile(data);
    }
);

export const deleteUserThunk = createAsyncThunk(
    'user/delete',
    async () => {
        return await authApi.deleteProfile();
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    selectors: {
        selectIsAuth: (state) => state.token !== null,
        selectToken: (state) => state.token,
        selectUser: (state) => state.user,
    },
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        // setToken: (state, action: PayloadAction<string>) => {
        //     state.token = action.payload;
        //     localStorage.setItem("token", state.token);
        // },
        // setCredentials: (state, action: PayloadAction<ActiveUserState>) => {
        //     state.token = action.payload.token;
        //     state.user = action.payload.user;
        //     localStorage.setItem("token", action.payload.token);
        // },

        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, () => { })
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<ActiveUserState>) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginThunk.rejected, (state) => {
                state.token = null;
                state.user = null;
                localStorage.removeItem("token");
            });

        builder
            .addCase(registerThunk.pending, () => { })
            .addCase(registerThunk.fulfilled, (state, action: PayloadAction<ActiveUserState>) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(registerThunk.rejected, (state) => {
                state.token = null;
                state.user = null;
                localStorage.removeItem("token");
            });

        // builder
        //     .addCase(logoutThunk.fulfilled, (state) => {
        //         state.token = null;
        //         state.user = null;
        //     })
        //     .addMatcher(
        //         (action) => [loginThunk.rejected, registerThunk.rejected].includes(action.type),
        //         (state) => {
        //             state.token = null;
        //             state.user = null;
        //             localStorage.removeItem("token"); //  genius:P
        //         }
        //     );

        builder
        .addCase(updateUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        .addCase(updateUserThunk.pending, () => { })
        .addCase(updateUserThunk.rejected, () => { });
        
        builder.addCase(deleteUserThunk.fulfilled, (state) => {
            state.user = null;
            localStorage.removeItem('token');
        })
        .addCase(deleteUserThunk.pending, () => { })
        .addCase(deleteUserThunk.rejected, () => { });
    },
});

// export const { logout, setUser, setCredentials, setToken } = userSlice.actions;
export const { logout, setUser } = userSlice.actions;

export const { selectIsAuth, selectToken, selectUser } = userSlice.selectors;

export default userSlice.reducer;
