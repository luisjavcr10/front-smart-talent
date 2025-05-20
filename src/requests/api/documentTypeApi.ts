import { apiClient } from '@/lib/axios/client';
import { DOCUMENT_TYPE_ENDPOINTS } from './endpoints';
import { DocumentTypeResponse } from '../interfaces/IDocumentTypeResponse';

export const documentTypeApi = {
    getAllWithResourceTypes: () => 
        apiClient.get<DocumentTypeResponse>(
            DOCUMENT_TYPE_ENDPOINTS.GET_ALL_WITH_RESOURCE_TYPES
        ),
};