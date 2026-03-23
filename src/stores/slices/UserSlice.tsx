import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isAuth: false },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        }
    }
});

export default userSlice.reducer;