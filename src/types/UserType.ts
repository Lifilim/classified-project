export type User = {
    id: string;
    phone: string;
    passwordHash: string;
    name: string | undefined | null;
    avatar: string | undefined;
    city: string | undefined;
    rating: number;
    createdAt: Date;
    isVerified: boolean;
    // cards: Card[];
    // roles: Role[];
};
