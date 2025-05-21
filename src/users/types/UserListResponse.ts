export interface UsersListResponse {
    id: number;
    type: string;
    documentNumber: string;
    firstName: string;
    maternalSurname: string;
    paternalSurname: string;
    businessName: string | null;
    active: boolean;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        username: string;
        email: string;
        Roles: Role[];
    };
}

interface Role {
    name: string;
}


export interface UserProps {
    documentNumber: string;
    firstName?: string;
    paternalSurname?: string;
    maternalSurname?: string;
    businessName?: string;
    email: string;
    address: string;
    phone: string;
}

export interface UserResponse {
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
    user?: {
        email: string;
        username: string;
    };
}