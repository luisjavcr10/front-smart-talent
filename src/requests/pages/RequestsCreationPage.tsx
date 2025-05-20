import { useState } from "react";
import { CreationTable } from "../components/private/creation/CreationTable";
import { RequestsType } from "../types/RequestsListType";
import { IDocumentType } from "../interfaces/IDocumentTypeResponse";

export function RequestsCreationPage() {
  const [requests, setRequests] = useState<RequestsType[]>([]);
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);

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
    const docs = newRequests[rowIndex].docs;
    if (checked) {
      if (!docs.some((doc) => doc.name === docType.name)) {
        docs.push({ 
          name: docType.name, 
          state: true, 
          resources: docType.resourceTypes
        });
      }
    } else {
      newRequests[rowIndex].docs = docs.filter((doc) => doc.name !== docType.name);
    }
    setRequests(newRequests);
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
    </div>
  );
}
