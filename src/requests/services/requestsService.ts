import { apiClient } from '@/lib/axios/client';
import { REQUEST_ENDPOINTS } from '../api/endpoints';

export interface Request {
    id: string;
    owner?: string;
    dni: string;
    fullname: string;
    status: string;
    phone: string;
    documents: {
        id: number;
        name: string;
        url: string | null;
        result: string | null;
        resources: {
            id: number;
            name: string;
            value: string;
        }[]
    }[];
}

export interface GetAllPeopleResponse {
    message: string;
    people: Request[];
}

export const requestsService = {
    getAllPeople: async (): Promise<GetAllPeopleResponse> => {
        try {
            const response = await apiClient.get(REQUEST_ENDPOINTS.GET_REQUEST_PEOPLE);
            return response.data;
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
            throw error;
        }
    },
    getAllPeopleByEntityId: async (entityId: number): Promise<GetAllPeopleResponse> => {
        try {
            const response = await apiClient.get(REQUEST_ENDPOINTS.GET_REQUEST_PEOPLE_BY_ENTITY_ID(entityId));
            return response.data;
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
            throw error;
        }
    },
};