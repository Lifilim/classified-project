import api from "./axios";
import { ActiveUserState } from "../types/UserStateType";
import { User } from "../types/UserType";
import { LoginDTO } from "../types/LoginDTOType";
import { RegisterDTO } from "../types/RegisterDTOType";

export const authApi = {
  async login(dto: LoginDTO) : Promise<ActiveUserState> {
    const { data } = await api.post<ActiveUserState>("/auth/login", dto);
    return data;
  },
  async register(dto: RegisterDTO) : Promise<ActiveUserState> {
    const { data } = await api.post<ActiveUserState>("/auth/register", dto);
    return data;
  },
  async getProfile() {
    const { data } = await api.get<User>("/auth/profile");
    return data;
  },
  async updateProfile(fields: {
    name?: string;
    avatar?: string;
    city?: string;
  }) {
    const { data } = await api.patch<User>("/auth/profile", fields);
    return data;
  },
};
