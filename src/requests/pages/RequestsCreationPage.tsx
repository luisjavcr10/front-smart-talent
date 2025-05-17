import { useState } from "react";
import { CreationTable } from "../components/private/creation/CreationTable";
import { RequestsType } from "../types/RequestsListType";

export function RequestsCreationPage() {
  const [requests, setRequests] = useState<RequestsType[]>([]);
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);

  const toggleOpenOptions = (rowIndex: number) => {
    setOpenOptionsIndex(openOptionsIndex === rowIndex ? null : rowIndex);
  };

  const handleSetOpenOptions = () =>{
    setOpenOptionsIndex(null);
  }

  const handleRequests = (newRequests: RequestsType[]) => {
    setRequests(newRequests);
  };

  const handleDocCheckbox = (
    rowIndex: number,
    docName: string,
    checked: boolean
  ) => {
    const newRequests = [...requests];
    const docs = newRequests[rowIndex].docs;
    if (checked) {
      if (!docs.some((doc) => doc.name === docName)) {
        docs.push({ name: docName, state: true });
      }
    } else {
      newRequests[rowIndex].docs = docs.filter((doc) => doc.name !== docName);
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
        <h1 className="font-bebasneue text-[32px] md:text-[48px] xl:text-[64px]">
          CREACIÓN DE SOLICITUDES
        </h1>
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
