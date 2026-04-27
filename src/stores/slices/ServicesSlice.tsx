import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { servicesApi } from '../../api/servicesAPI';
import { Service } from '../../types/Service';


interface ServicesState {
    items: Service[];
    loading: boolean;
    error: string | null;
}

const initialState: ServicesState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchServices = createAsyncThunk(
    'services/fetchAll',
    async () => {
        return await servicesApi.getAll();
    }
);

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    selectors: {
        selectServices: (state) => state.items,
        selectServicesLoading: (state) => state.loading,
        selectServicesError: (state) => state.error,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchServices.rejected, (state) => {
                state.loading = false;
                state.error = 'Не удалось загрузить услуги(((';
            });
    },
});

export const { selectServices, selectServicesLoading, selectServicesError } = servicesSlice.selectors;

export default servicesSlice.reducer;