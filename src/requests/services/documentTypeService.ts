import { documentTypeApi } from '../api/documentTypeApi';
import { DocumentTypeResponse } from '../interfaces/IDocumentTypeResponse';

export const DocumentTypeService = {
    async getAllWithResourceTypes(): Promise<DocumentTypeResponse> {
        try {
            const { data } = await documentTypeApi.getAllWithResourceTypes();
            return data;
        } catch (error) {
            throw new Error('Error al obtener tipos de informes');
        }
    },
};
