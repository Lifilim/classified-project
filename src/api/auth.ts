import api from "./axios";

export const authApi = {
  async login(phone: string, password: string) {
    const { data } = await api.post("/auth/login", { phone, password });
    return data;
  },
  async register(phone: string, password: string, name?: string) {
    const { data } = await api.post("/auth/register", {
      phone,
      password,
      name,
    });
    return data;
  },
  async getProfile() {
    const { data } = await api.get("/auth/profile");
    return data;
  },
  async updateProfile(fields: {
    name?: string;
    avatar?: string;
    city?: string;
  }) {
    const { data } = await api.patch("/auth/profile", fields);
    return data;
  },
};
