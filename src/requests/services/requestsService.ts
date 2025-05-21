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
        filename: File | string | null;
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

// Añadir a la interfaz del servicio
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
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
            throw error;
        }
    },
  
  updateDocuments: async (updates: { id: number; result: string; filename: string }[]): Promise<void> => {
    try {
      await apiClient.put(REQUEST_ENDPOINTS.UPDATE_DOCUMENTS, { updates });
    } catch (error) {
      console.error('Error al actualizar los informes:', error);
      throw error;
    }
  }
};