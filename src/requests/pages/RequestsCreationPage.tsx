import { useState } from "react";
import { CreationTable } from "../components/private/creation/CreationTable";
import { RequestsType } from "../types/RequestsListType";
import { IDocumentType } from "../interfaces/IDocumentTypeResponse";
import { useUpload } from "@/shared/hooks/useUpload";
import { apiClient } from "@/lib/axios/client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Loader } from "@/shared/components/Loader";
import { useUser } from "@/auth/hooks/useUser";

export function RequestsCreationPage() {
  const [requests, setRequests] = useState<RequestsType[]>([]);
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useUser();
  const navigate = useNavigate();

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
          resources: [],
        });
      }
    } else {
      newRequests[rowIndex].documents = docs.filter(
        (doc) => doc.name !== docType.name
      );
    }
    setRequests(newRequests);
  };

  const handleBackToList = () => {
    if (requests.length > 0) {
      if (confirm('Hay registros pendientes ¿Está seguro que desea regresar?')) {
        navigate("/requests");
      }
    } else {
      navigate("/requests");
    }
  };

  const { uploadFile } = useUpload();

  const handleSaveRequests = async () => {
    try {
      setIsLoading(true);

      if (requests.length === 0) {
        alert("Debe agregar al menos una solicitud");
        return;
      }

      const hasIncompleteRequests = requests.some(
        (request) =>
          !request.dni ||
          !request.fullname ||
          !request.phone ||
          request.documents.length === 0
      );

      if (hasIncompleteRequests) {
        alert(
          "Todas las solicitudes deben tener datos completos y al menos un documento seleccionado"
        );
        return;
      }

      setIsLoading(true);
      // Procesar todos los archivos de los informes
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
                        const signedUrlResponse = await apiClient.post('/upload/write-signed-url', {
                          fileName: file.name,
                          contentType: file.type
                        });

                        const signedUrl = signedUrlResponse.data.signedUrl;                        

                        // Subir el archivo usando el hook
                        await uploadFile(file, signedUrl);

                        // Agregar nuevo recurso con la URL
                        processedResources.push({
                          ...resource,
                          value: file.name
                        });
                      } catch (error) {
                        console.error("Error al procesar archivo:", error);
                        throw error;
                      }
                    }
                  }
                } else {
                  processedResources.push(resource);
                }
              }

              return {
                ...doc,
                resources: processedResources,
              };
            })
          );

          return {
            ...request,
            documents: processedDocuments,
          };
        })
      );

      // Enviar las solicitudes procesadas al backend
      const response = await apiClient.post('/requests', { 
          entityId: user?.entityId, 
          people: processedRequests 
        });


      if (response.status === 200) {
        throw new Error("Error al guardar las solicitudes");
      }

      setRequests([]);
      alert("Solicitudes guardadas exitosamente");
      navigate("/requests");
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al guardar las solicitudes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-12 my-15 gap-4">
      <div
        className="
                    flex flex-row justify-between items-center
                    w-full mt-5 mb-5 md:mt-0
                    text-black dark:text-white"
      >
        <div>
          <p className="font-karla text-[32px] md:text-[36px] xl:text-[36px]">
            CREACIÓN DE SOLICITUDES
          </p>
          <p className="text-[12px] font-light">
            Registra personas por DNI y nombre para solicitar informes.
          </p>
        </div>
        <motion.button
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBackToList}
          className="
            bg-white-2 dark:bg-black-2 hover:bg-white-1 dark:hover:bg-black-1 
            border border-medium rounded-sidebar 
             py-2 px-16 
            text-[14px] font-light
            cursor-pointer
          "
        >
          Regresar a solicitudes
        </motion.button>
      </div>
      <CreationTable
        requests={requests}
        openIndex={openOptionsIndex}
        handleRequests={handleRequests}
        toggleOpenOptions={toggleOpenOptions}
        handleOpenOptionsIndex={handleSetOpenOptions}
        handleDocCheckbox={handleDocCheckbox}
      />

      <div className="flex justify-end items-center">
        <motion.button
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveRequests}
          disabled={isLoading}
          className={`
            bg-main-1plus dark:bg-main hover:bg-main dark:hover:bg-main-1plus 
            rounded-sidebar 
             py-2 px-16 
            text-[14px] font-light
            cursor-pointer
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          Crear solicitudes
        </motion.button>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
