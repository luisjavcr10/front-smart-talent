import { STATUS } from "@/auth/constants/status";
import { Request, requestsService } from "@/requests/services/requestsService";
import { useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import { Modal } from "@/shared/components/Modal"; // Asegúrate de importar el componente Modal
import { ResourceOutput } from "../../public/ResourceOutput";
import { apiClient } from "@/lib/axios/client";
import { useUpload } from '@/shared/hooks/useUpload'
import { useUser } from "@/auth/hooks/useUser";
import { ROLES } from "@/auth/constants/roles";

export const RequestsTable = ({
  data,
  isAdmin,
}: Readonly<{
  data: Request[];
  isAdmin: boolean;
}>) => {
  const [openRows, setOpenRows] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const { uploadFile } = useUpload();
  const { user } = useUser()

  // Inicializar requests con los datos proporcionados
  useState(() => {
    setRequests(data);
  });

  const handleToggleRow = (index: number) => {
    setOpenRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRequests = (newRequests: Request[]) => {
    setRequests(newRequests);
  };

  const handleFileUpload = async (file: File) => {
    try {
      const response = await apiClient.post('upload/write-signed-url', {
        fileName: file.name,
        contentType: file.type
      });

      if (response.status !== 200) {
        throw new Error('No se pudo obtener la URL firmada para subir el archivo');
      }

      const { signedUrl } = response.data;

      await uploadFile(file, signedUrl);

      return file.name;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Error al subir el archivo. Por favor, inténtelo de nuevo.');
      return null;
    }
  };

  const handleConfirmRequest = async () => {
    if (selectedRequest === null) return;

    if (user?.roles.includes(ROLES.ADMIN)) {
      try {
        const loadingMessage = 'Procesando documentos...';
        alert(loadingMessage);
  
        const documentsToUpdate = [];
  
        for (let i = 0; i < requests[selectedRequest].documents.length; i++) {
          const doc = requests[selectedRequest].documents[i];
  
          if (doc.filename instanceof File) {
            const fileKey = await handleFileUpload(doc.filename);
            if (fileKey) {
              documentsToUpdate.push({
                id: doc.id,
                result: doc.result || '',
                filename: fileKey
              });
            }
          }
        }
  
        await requestsService.updateDocuments(documentsToUpdate);
        alert('Documentos actualizados correctamente');
      } catch (error) {
        console.error('Error al actualizar los documentos:', error);
        alert('Error al actualizar los documentos. Por favor, inténtelo de nuevo.');
      }
    }
    setModalOpen(false);
  };

  const openResourceModal = (index: number) => {
    setSelectedRequest(index);
    setModalOpen(true);
  };

  return (
    <div className="w-full text-[14px] font-karla font-light">
      {/* Header */}
      <div className="px-2 grid grid-cols-12 gap-0 bg-main-3plus dark:bg-main-1plus text-black dark:text-white rounded-sidebar mb-4">
        {isAdmin &&
          <div className="col-span-1 p-2">Propietario</div>
        }
        <div className="col-span-1 p-2">DNI</div>
        <div className="col-span-3 p-2 hidden md:block">Nombre Completo</div>
        <div className="col-span-1 p-2 hidden md:block">Estado</div>
        <div className="col-span-5 p-2 hidden md:block">Documentos</div>
        <div className="col-span-1 p-2 hidden md:block">Acciones</div>
        <div className="col-span-1 p-2 md:hidden">Acciones</div>
      </div>

      {/* Rows */}
      <div className="text-black dark:text-white flex flex-col gap-2">
        {data.map((request, index) => (
          <div key={index}>
            {/* Main Row */}
            <div className="px-2 grid grid-cols-12 border border-white-1 dark:border-black-1 rounded-sidebar hover:bg-black-05 dark:hover:bg-white-10">
              {isAdmin &&
                <div className="col-span-1 p-2">
                  {request.owner}
                </div>
              }
              <div className="col-span-1 p-2 ">
                {request.dni}
              </div>
              <div className="col-span-3 p-2 ">
                {request.fullname}
              </div>
              <div className="col-span-1 p-2  hidden md:block">
                <span>{STATUS[request.status as keyof typeof STATUS]}</span>
              </div>
              <div className="col-span-5 p-2  hidden md:block">
                <div className="flex flex-wrap gap-1">
                  {request.documents.map((doc: any, docIndex: number) => (
                    <span
                      key={docIndex}

                      className={`${
                        doc.state
                          ? "bg-success text-white"
                          : "border border-white-1 dark:border-black-1 text-black dark:text-white"
                      } py-0.5 px-2 rounded-[5px]`}
                    >
                      {doc.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-1 p-2  hidden md:block text-center">
                <button
                  title="Ver detalles de solicitud"
                  className="cursor-pointer text-center hover:text-main-2plus"
                  onClick={() => openResourceModal(index)}
                >
                  <p>Ver</p>
                </button>
              </div>
              <div className="col-span-1 p-2  md:hidden text-center">
                <button
                  className="text-center"
                  onClick={() => handleToggleRow(index)}
                >
                  <FaChevronCircleDown
                    className={`w-[20px] h-[20px] transform origin-center transition-all duration-500 ease-in-out ${openRows.includes(index) ? "rotate-180" : ""
                      }`}
                  />
                </button>
              </div>
            </div>

            {/* Expanded Row (Mobile) */}
            {openRows.includes(index) && (
              <div className="md:hidden col-span-12">
                <div className="p-2 border border-black-05 dark:border-shadow-dark">
                  <div className="flex flex-col gap-2 mx-4 my-2">
                    <p>
                      Estado: <strong>{STATUS[request.status as keyof typeof STATUS]}</strong>
                    </p>
                    <p>Documentos solicitados:</p>
                    <div className="flex flex-col gap-1 items-center">
                      {request.documents.map((doc: any, docIndex: number) => (
                        <span
                          key={docIndex}
                          className={`w-full ${doc.state
                            ? "bg-success text-white"
                            : "bg-transparent border border-black-05 dark:border-shadow-dark text-black dark:text-white"
                            } py-0.5 px-2 rounded-[5px] text-center`}
                        >
                          {doc.name}
                        </span>
                      ))}
                    </div>
                    <div className="w-full flex justify-end mt-2">
                      <button
                        onClick={() => openResourceModal(index)}
                        className="py-0.5 px-2 bg-black-15 dark:bg-white-20 rounded-[5px]"
                      >
                        Ver documentos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>


      <Modal
        isOpen={modalOpen}
        title={!user?.roles.includes('ADMIN') ? "Visualización y descarga de archivos" : "Carga de documentos solicitados"}
        onClose={() => {
          setModalOpen(false);
          if (selectedRequest !== null && requests[selectedRequest]?.documents) {
            //const newRequests = [...requests];
            // newRequests[selectedRequest].documents = newRequests[selectedRequest].documents.filter(doc => doc.resources && doc.resources.length > 0);
            // handleRequests(newRequests);
          }
        }}
        position="center"
        width="400px"
        className="p-6"
        footer={<>
          <button
            className="px-4 py-2 text-sm bg-main text-white rounded-md hover:bg-opacity-90"
            onClick={handleConfirmRequest}
          >
            Confirmar
          </button>
        </>}
      >
        <div className="flex flex-col gap-4">

          {selectedRequest !== null && requests[selectedRequest] && (
            <div className="text-sm">
              {requests[selectedRequest]?.documents.map((doc, i) => {

                return (<div key={i} className="gap-2 mb-4">
                  <h2 className="text-lg font-medium mb-2">{doc.name}</h2>
                  {user?.roles.includes('ADMIN') ?
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Resultado</label>
                        <input
                          type="text"
                          placeholder="Agregar una descripción"
                          value={doc.result || ''}
                          onChange={(e) => {
                            if (selectedRequest !== null) {
                              const newRequests = [...requests];
                              newRequests[selectedRequest].documents[i].result = e.target.value;
                              handleRequests(newRequests);
                            }
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-2plus"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Documento</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0 && selectedRequest !== null) {
                              const file = e.target.files[0];
                              const newRequests = [...requests];
                              newRequests[selectedRequest].documents[i].filename = file;
                              handleRequests(newRequests);
                            }
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-2plus file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-main-2plus file:text-white hover:file:bg-main-3plus"
                        />
                      </div>

                  {doc.resources.map((resource, j) => (
                    <ResourceOutput key={j} {...resource} />
                  ))}
                    </div> : <div>
                      <ResourceOutput key={Date.now() - 1} name="Resultados" value={doc.result as string} />
                      <ResourceOutput key={Date.now() - 2}  name="Documento" value={doc.filename as string}/>
                    </div>}



                </div>)
              })}
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
};