export interface DocumentTypeResponse {
    message: string;
    documentTypes: IDocumentType[];
}

export interface IDocumentType {
    id: number;
    name: string;
    resourceTypes: IResourceType[];
}
  
export interface IResourceType {
    id: number;
    name: string;
    documentTypeId: number;
    allowedFileTypes: string[];
}