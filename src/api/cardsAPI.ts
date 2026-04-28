import api from './axios';

export interface CreateCardDto {
  title: string;
  description: string;
  price: number | string;
  imageUrl?: string;
  category: string;
}

export const cardsAPI = {
  create: (dto: CreateCardDto) => api.post('/cards', dto),
  getAll: () => api.get('/cards'),
  getMy: () => api.get('/cards/my'),
  getOne: (id: string) => api.get(`/cards/${id}`),
};