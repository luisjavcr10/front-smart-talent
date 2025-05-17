import { useRef, useEffect } from "react";
import { DocsChecklist } from "./DocsChecklist";
import { RequestsType } from "@/requests/types/RequestsListType";
import { motion } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { Checkbox } from "@/components/ui/checkbox";
import { AddRequestButton } from "./AddRequestButton";

export const CreationTable = ({
  requests,
  openIndex,
  handleRequests,
  toggleOpenOptions,
  handleOpenOptionsIndex,
  handleDocCheckbox,
}: Readonly<{
  requests: RequestsType[];
  openIndex: number | null;
  handleRequests: (newRequests: RequestsType[]) => void;
  toggleOpenOptions: (rowIndex: number) => void;
  handleOpenOptionsIndex: () => void;
  handleDocCheckbox: (
    rowIndex: number,
    docName: string,
    checked: boolean
  ) => void;
}>) => {
  const listEndRef = useRef<HTMLDivElement>(null);

  const addRow = () => {
    handleRequests([
      ...requests,
      {
        dni: "",
        fullname: "",
        phone: "",
        docs: [],
      },
    ]);
  };

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [requests]);

  return (
    <div className="w-full h-[550px] bg-white-100 dark:bg-white-10 shadow-doc-options text-[12px] overflow-x-auto relative text-black dark:text-white">
      {/* Encabezados con grid */}
      <div className="grid grid-cols-[0.5fr_2fr_4fr_2fr_8fr_2fr] min-w-[800px] sticky top-0 z-10 bg-cream dark:bg-black-0 ">
        <div className="p-2 border border-border dark:border-shadow-dark">
          <Checkbox />
        </div>
        <div className="p-2 border border-border dark:border-shadow-dark">
          DNI
        </div>
        <div className="p-2 border border-border dark:border-shadow-dark">
          Nombres completos
        </div>
        <div className="p-2 border border-border dark:border-shadow-dark">
          Teléfono
        </div>
        <div className="p-2 border border-border dark:border-shadow-dark">
          Documentos
        </div>
        <div className="p-2 border border-border dark:border-shadow-dark">
          Acciones
        </div>
      </div>

      {/* Filas con grid */}
      <div className="min-w-[800px]">
        {requests.map((request, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_4fr_2fr_8fr_2fr] bg-black-02 hover:bg-black-05 dark:hover:bg-white-10"
          >
            {/* Checkbox */}
            <div className="p-2 border border-border dark:border-shadow-dark "><Checkbox /></div>

            {/* DNI */}
            <div className="p-2 border border-border dark:border-shadow-dark">
              <div className="w-full overflow-hidden">
                <input
                  className="w-full bg-transparent focus:outline-none number-input-hide-arrows"
                  type="text"
                  value={request.dni}
                  onChange={(e) => {
                    const newRequests = [...requests];
                    newRequests[index].dni = e.target.value;
                    handleRequests(newRequests);
                  }}
                  style={{ minWidth: "0" }}
                />
              </div>
            </div>

            {/* Nombres completos */}
            <div className="p-2 border border-border dark:border-shadow-dark">
              <textarea
                className="w-full resize-none bg-transparent focus:outline-none"
                value={request.fullname}
                onChange={(e) => {
                  const newRequests = [...requests];
                  newRequests[index].fullname = e.target.value;
                  handleRequests(newRequests);
                }}
                rows={1}
                style={{
                  minHeight: "1.5rem",
                  overflow: "hidden",
                }}
                onInput={(e) => {
                  e.currentTarget.style.height = "auto";
                  e.currentTarget.style.height =
                    e.currentTarget.scrollHeight + "px";
                }}
              />
            </div>

            {/* Teléfono */}
            <div className="p-2 border border-border dark:border-shadow-dark">
              <div className="w-full h-full overflow-hidden">
                <input
                  className="w-full bg-transparent focus:outline-none number-input-hide-arrows"
                  type="text"
                  value={request.phone}
                  onChange={(e) => {
                    const newRequests = [...requests];
                    newRequests[index].phone = e.target.value;
                    handleRequests(newRequests);
                  }}
                  style={{ minWidth: "0" }}
                />
              </div>
            </div>

            {/* Documentos */}
            <div className="p-2 border border-border dark:border-shadow-dark relative">
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-wrap gap-1 flex-1">
                  {request.docs.map((doc, docIndex) => (
                    <span
                      key={docIndex}
                      className="bg-white border border-border text-black py-0.5 px-2 rounded-[5px]"
                    >
                      {doc.name}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white dark:bg-transparent border border-black dark:border-white rounded-[5px] ml-auto"
                  onClick={() => toggleOpenOptions(index)}
                >
                  <GoPlus className="w-[20px] h-[20px]" />
                </motion.button>
              </div>
              <DocsChecklist
                openIndex={openIndex}
                index={index}
                request={request}
                handleOpen={handleOpenOptionsIndex}
                handleDocCheckbox={handleDocCheckbox}
              />
            </div>

            {/* Acciones */}
            <div className="p-2 border border-border dark:border-shadow-dark">
              <button className="cursor-pointer">Confirmar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para agregar fila */}
      <div ref={listEndRef} className="flex justify-start p-4">
        <AddRequestButton addRow={addRow} />
      </div>
    </div>
  );
};
