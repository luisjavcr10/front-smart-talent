import { useState } from "react";
import { CreationTable } from "../components/private/creation/CreationTable";
import { RequestsType } from "../types/RequestsListType";
import { IDocumentType } from "../interfaces/IDocumentTypeResponse";
import { useUpload } from "@/shared/hooks/useUpload";
import { apiClient } from "@/lib/axios/client";

export function RequestsCreationPage() {
  const [requests, setRequests] = useState<RequestsType[]>([]);
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleOpenOptions = (rowIndex: number) => {
    setOpenOptionsIndex(openOptionsIndex === rowIndex ? null : rowIndex);
  };

  const handleSetOpenOptions = () => {
    setOpenOptionsIndex(null);
  };

  const handleRequests = (newRequests: RequestsType[]) => {
    setRequests(newRequests);
  };

  const handleDocCheckbox = (
    rowIndex: number,
    docType: IDocumentType,
    checked: boolean
  ) => {
    const newRequests = [...requests];
    const docs = newRequests[rowIndex].documents;
    if (checked) {
      if (!docs.some((doc) => doc.name === docType.name)) {
        docs.push({ 
          documentTypeId: docType.id,
          name: docType.name, 
          state: true,
          resourceTypes: docType.resourceTypes,
          resources: []
        });
      }
    } else {
      newRequests[rowIndex].documents = docs.filter((doc) => doc.name !== docType.name);
    }
    setRequests(newRequests);
  };

  const { uploadFile } = useUpload();

  const handleSaveRequests = async () => {
    try {
      setIsLoading(true);
      
      if (requests.length === 0) {
        alert('Debe agregar al menos una solicitud');
        return;
      }

      const hasIncompleteRequests = requests.some(
        request => !request.dni || !request.fullname || !request.phone || request.documents.length === 0
      );

      if (hasIncompleteRequests) {
        alert('Todas las solicitudes deben tener datos completos y al menos un documento seleccionado');
        return;
      }

      // Procesar todos los archivos de los documentos
      const processedRequests = await Promise.all(
        requests.map(async (request) => {
          const processedDocuments = await Promise.all(
            request.documents.map(async (doc) => {
              const processedResources = [];
              
              for (const resource of doc.resources) {
                if (Array.isArray(resource.value)) {
                  // Procesar cada archivo en el array
                  for (const file of resource.value) {
                    if (file instanceof File) {
                      try {
                        // Obtener URL firmada del backend
                        const signedUrlResponse = await apiClient.post('/upload/signed-url', {
                          fileName: file.name,
                          contentType: file.type
                        });

                        const signedUrl = signedUrlResponse.data.signedUrl;                        
                        // Subir el archivo usando el hook
                        await uploadFile(file, signedUrl);
                        
                        // Agregar nuevo recurso con la URL
                        processedResources.push({
                          ...resource,
                          value: signedUrl.split('?')[0] // URL base sin parámetros de firma
                        });
                      } catch (error) {
                        console.error('Error al procesar archivo:', error);
                        throw error;
                      }
                    }
                  }
                } else {
                  // Si no es un array de archivos, mantener el recurso original
                  processedResources.push(resource);
                }
              }

              return {
                ...doc,
                resources: processedResources
              };
            })
          );

          return {
            ...request,
            documents: processedDocuments
          };
        })
      );
      debugger
      // Enviar las solicitudes procesadas al backend
      const response = await apiClient.post('/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          entityId: 1, 
          people: processedRequests 
        }),
      });

      if (response.status === 200) {
        throw new Error('Error al guardar las solicitudes');
      }

      setRequests([]);
      alert('Solicitudes guardadas exitosamente');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al guardar las solicitudes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-12 my-15 gap-11">
      <div
        className="
                    flex flex-row justify-between items-center
                    w-full mt-5 md:mt-0
                    text-black dark:text-white"
      >
        <div>
          <p className="font-karla text-[32px] md:text-[36px] xl:text-[36px]">
          CREACIÓN DE SOLICITUDES
          </p>
          <p className="text-[12px] font-light">
            Registra personas por DNI y nombre para solicitar documentos.
          </p>
        </div>
      </div>
      <CreationTable
        requests={requests}
        openIndex={openOptionsIndex}
        handleRequests={handleRequests}
        toggleOpenOptions={toggleOpenOptions}
        handleOpenOptionsIndex={handleSetOpenOptions}
        handleDocCheckbox={handleDocCheckbox}
      />

      <div className="flex justify-center items-center mt-8">
        <button 
          onClick={handleSaveRequests}
          disabled={isLoading}
          className={`
            btn btn-primary
            px-8 py-3
            text-lg font-semibold
            rounded-lg
            transition-all duration-300
            hover:scale-105
            hover:shadow-lg
            bg-gradient-to-r from-blue-500 to-blue-700
            text-white
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </div>
  );
}
