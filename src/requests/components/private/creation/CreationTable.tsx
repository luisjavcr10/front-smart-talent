import { useState, useRef, useEffect } from "react";
import { DocsChecklist } from "./DocsChecklist";
import { RequestsType } from "@/requests/types/RequestsListType";
import { AddButton } from "./AddButton";

const headers = [
  "DNI",
  "Nombres completos",
  "Teléfono",
  "Documentos",
  "Acciones",
];

interface InputErrors {
  dni: Record<number, boolean>;
  phone: Record<number, boolean>;
  fullname: Record<number, boolean>;
}

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
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    dni: {},
    phone: {},
    fullname: {},
  });
  const listEndRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
  const setInputRef = (el: HTMLInputElement | null, index: number) => {
    inputRefs.current[index] = el;
  };

  useEffect(() => {
    if (requests.length > 0) {
      const lastInput = inputRefs.current[requests.length - 1];
      lastInput?.focus();
    }
  }, [requests.length]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [requests]);

  return (
    <div className="p-3 w-full h-[500px] bg-white-100 dark:bg-white-10 shadow-doc-options text-[14px] overflow-x-auto relative text-black dark:text-white rounded-sidebar font-karla font-light">
      {/* Encabezados con grid - usando 12 columnas para mejor control */}
      <div className="px-2 grid grid-cols-40 items-center min-w-[800px] sticky top-0 z-10 bg-main-3plus dark:bg-black-0 rounded-sidebar mb-4">
        {/* DNI - 2 columnas */}
        <div className="col-span-5 p-2">{headers[0]}</div>
        {/* Nombres - 4 columnas */}
        <div className="col-span-8 p-2">{headers[1]}</div>
        {/* Teléfono - 2 columnas */}
        <div className="col-span-5 p-2">{headers[2]}</div>
        {/* Documentos - 2 columnas */}
        <div className="col-span-16 p-2">{headers[3]}</div>
        {/* Acciones - 1 columna */}
        <div className="col-span-6 p-2">{headers[4]}</div>
      </div>

      {/* Filas con grid */}
      <div className="text-black dark:text-white flex flex-col gap-2">
        {requests.map((request, index) => (
          <div key={index}>
            <div className="px-2 grid grid-cols-40 h-full border border-white-1 rounded-sidebar hover:bg-black-05 dark:hover:bg-white-10">
              {/* DNI - 2 columnas */}
              <div className="col-span-5 p-2 ">
                <div className="w-full overflow-hidden">
                  <input
                    ref={(el) => setInputRef(el, index)}
                    className={`w-full bg-white rounded-[5px] py-0.5 px-1 focus:outline-none number-input-hide-arrows ${
                      inputErrors.dni[index]
                        ? "border border-red"
                        : "border border-border"
                    }`}
                    type="text"
                    value={request.dni}
                    onChange={(e) => {
                      const value = e.target.value;
                      const hasInvalidChars = /[^0-9]/.test(value);
                      const length = value.length;

                      setInputErrors((prev) => ({
                        ...prev,
                        dni: { ...prev.dni, [index]: (hasInvalidChars || length>=9 || length<=7) },
                      }));

                      const newRequests = [...requests];
                      newRequests[index].dni = value;
                      handleRequests(newRequests);
                    }}
                  />
                  {inputErrors.dni[index] && (
                    <p className="text-red text-[8px] font-bold mt-1">
                      Formato incorrecto
                    </p>
                  )}
                </div>
              </div>

              {/* Nombres completos - 4 columnas */}
              <div className="col-span-8 p-2 ">
                <div className="w-full overflow-hidden"> 
                  <textarea
                    className={`w-full resize-none bg-white rounded-[5px] py-0.5 px-1 focus:outline-none ${
                      inputErrors.fullname[index]
                        ? "border border-red"
                        : "border border-border"
                    }`}
                    value={request.fullname}
                    onChange={(e) => {
                      const value = e.target.value;
                      const hasNumbers = /[0-9]/.test(value);

                      setInputErrors((prev) => ({
                        ...prev,
                        fullname: { ...prev.fullname, [index]: hasNumbers },
                      }));

                      const newRequests = [...requests];
                      newRequests[index].fullname = value;
                      handleRequests(newRequests);
                    }}
                    rows={1}
                    onInput={(e) => {
                      e.currentTarget.style.height = "auto";
                      e.currentTarget.style.height =
                        e.currentTarget.scrollHeight + "px";
                    }}
                  />
                  {inputErrors.fullname[index] && (
                    <p className="text-red text-[8px] font-bold mt-1">
                      Formato incorrecto
                    </p>
                  )}
                </div>
              </div>

              {/* Teléfono - 2 columnas */}
              <div className="col-span-5 p-2 ">
                <div className="w-full h-full overflow-hidden">
                  <input
                    className={`w-full bg-white rounded-[5px] py-0.5 px-1 focus:outline-none number-input-hide-arrows ${
                      inputErrors.phone[index]
                        ? "border border-red"
                        : "border border-border"
                    }`}
                    type="text"
                    value={request.phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      const hasInvalidChars = /[^0-9]/.test(value);
                      const length = value.length;

                      setInputErrors((prev) => ({
                        ...prev,
                        phone: { ...prev.phone, [index]: hasInvalidChars || length>=10 || length<=8 },
                      }));

                      const newRequests = [...requests];
                      newRequests[index].phone = value;
                      handleRequests(newRequests);
                    }}
                  />
                  {inputErrors.phone[index] && (
                    <p className="text-red text-[8px] font-bold mt-1">
                      Formato incorrecto
                    </p>
                  )}
                </div>
              </div>

              {/* Documentos - 2 columnas */}
              <div className="col-span-16 p-2  relative">
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

                  <AddButton
                    type="document"
                    onClick={() => toggleOpenOptions(index)}
                  />
                </div>
                <DocsChecklist
                  openIndex={openIndex}
                  index={index}
                  request={request}
                  handleOpen={handleOpenOptionsIndex}
                  handleDocCheckbox={handleDocCheckbox}
                />
              </div>

              {/* Acciones - 1 columna */}
              <div className="col-span-6 p-2 flex justify-around items-center gap-1">
                <p className="text-[12px]">Confirmar</p>
                <p className="text-[12px]">Eliminar</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para agregar fila */}
      <div ref={listEndRef} className="flex justify-start p-4">
        <AddButton type="request" onClick={addRow} />
      </div>
    </div>
  );
};