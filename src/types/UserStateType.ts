import { User } from "./UserType";

export type UserState = {
    token: string | null;
    user: User | null;
};

export type ActiveUserState = {
    token: string;
    user: User;
};