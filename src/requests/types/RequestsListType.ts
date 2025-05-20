import { IResourceType } from "../interfaces/IDocumentTypeResponse";

export type RequestsType = {
    dni: string;
    fullname: string;
    phone: string;
    documents: {
      documentTypeId: number;
      name: string;
      state: boolean;
      resourceTypes: IResourceType[];
      resources: {
        resourceTypeId: number;
        name: string;
        value: File[] | string | null;
      }[];
    }[];
};