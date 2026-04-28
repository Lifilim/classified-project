export type User = {
    id: string;
    phone: string;
    name: string | undefined | null;
    avatar: string | undefined;
    city: string | undefined;
    rating: number;
    createdAt: string;
    isVerified: boolean;
    // cards: Card[];
    // roles: Role[];
};
