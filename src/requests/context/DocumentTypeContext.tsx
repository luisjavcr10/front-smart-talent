import { createContext, useState, useEffect, ReactNode } from "react";
import { DocumentTypeService } from "../services/documentTypeService";
import { IDocumentType } from "../interfaces/IDocumentTypeResponse";

interface DocumentTypeContextType {
  documentTypes: IDocumentType[];
  loading: boolean;
  error: string | null;
  refreshDocumentTypes: () => Promise<void>;
}

export const DocumentTypeContext = createContext<DocumentTypeContextType | undefined>(undefined);

export const DocumentTypeProvider = ({ children }: { children: ReactNode }) => {
  const [documentTypes, setDocumentTypes] = useState<IDocumentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocumentTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await DocumentTypeService.getAllWithResourceTypes();
      setDocumentTypes(response.documentTypes);
    } catch (error) {
      setError('Error al cargar los tipos de documentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  return (
    <DocumentTypeContext.Provider 
      value={{ 
        documentTypes, 
        loading, 
        error, 
        refreshDocumentTypes: fetchDocumentTypes 
      }}
    >
      {children}
    </DocumentTypeContext.Provider>
  );
};