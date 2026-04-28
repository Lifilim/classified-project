import api from "./axios";
import { Service } from '../types/Service';

export const servicesApi = {
  getAll: async () => {
    const res = await api.get<Service[]>('/cards');
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get<Service>(`/cards/${id}`);
    return res.data;
  },

  getMy: async () => {
    const res = await api.get<Service[]>(`/cards/my`);
    return res.data;
  }
};