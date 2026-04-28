import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { servicesApi } from '../../api/servicesAPI';
import { Service } from '../../types/Service';
import { logout } from './UserSlice';


interface ServicesState {
    items: Service[];
    loading: boolean;
    error: string | null;

    myItems: Service[];
}

const initialState: ServicesState = {
    items: [],
    loading: false,
    error: null,

    myItems: [],
};

export const fetchServicesThunk = createAsyncThunk(
    'services/fetchAll',
    async () => {
        return await servicesApi.getAll();
    }
);

export const fetchMyServicesThunk = createAsyncThunk(
    'services/fetchMy',
    async (_, { rejectWithValue }) => {
        try {
            const res = await servicesApi.getMy();
            return res;
        } catch (e) {
            return rejectWithValue('Ошибка загрузки ваших карточек');
        }
    }
);

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    selectors: {
        selectServices: (state) => state.items,
        selectServicesLoading: (state) => state.loading,
        selectServicesError: (state) => state.error,
        selectMyServices: (state) => state.myItems,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServicesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServicesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchServicesThunk.rejected, (state) => {
                state.loading = false;
                state.error = 'Не удалось загрузить услуги(((';
            });

        builder
            .addCase(fetchMyServicesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyServicesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.myItems = action.payload;
            })
            .addCase(fetchMyServicesThunk.rejected, (state) => {
                state.loading = false;
            });
            
        builder.addCase(logout, (state) => {
            state.myItems = [];
        });
    },
});

export const { selectServices, selectServicesLoading, selectServicesError, selectMyServices } = servicesSlice.selectors;

export default servicesSlice.reducer;