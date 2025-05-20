import { UsersApi } from "../api/usersApi";

interface UserProps {
    documentNumber: string;
    firstName?: string;
    paternalSurname?: string;
    maternalSurname?: string;
    businessName?: string;
    email: string;
    address: string;
    phone: string;
}

interface UserResponse {
    message: string;
    entity: {
        id: number;
        type: string;
        documentNumber: string;
        firstName: string;
        paternalSurname: string;
        maternalSurname: string;
        businessName: string | null;
        address: string;
        phone: string;
        active: boolean;
        updatedAt: string;
        createdAt: string;
    };
    user: {
        email: string;
        username: string;
    };
}

export const UsersService = {
    async createUser(payload: UserProps):Promise<UserResponse> {
        try {
            const { data } = await UsersApi.createUser(payload);
            return data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('Unauthorized');
            }
            throw new Error('Error creating user');
        }
    }
} ;