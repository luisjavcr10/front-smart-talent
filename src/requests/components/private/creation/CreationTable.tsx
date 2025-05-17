import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { DocsChecklist } from "./DocsChecklist";
import { RequestsType } from "@/requests/types/RequestsListType";
import { Checkbox } from "@/components/ui/checkbox";
import { AddButton } from "./AddButton";
import { FaDeleteLeft } from "react-icons/fa6";

const headers = [
  "DNI",
  "Nombres completos",
  "Teléfono",
  "Documentos",
  "Acciones",
];

interface InputErrors {
  dni: Record<number, boolean>; // { [index: number]: boolean }
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
    <div className="w-full h-[550px] bg-white-100 dark:bg-white-10 shadow-doc-options text-[12px] overflow-x-auto relative text-black dark:text-white">
      {/* Encabezados con grid */}
      <div className="grid grid-cols-[0.5fr_2fr_4fr_2fr_8fr_2.5fr] min-w-[800px] sticky top-0 z-10 bg-cream dark:bg-black-0 ">
        <div className="p-2 border border-border dark:border-shadow-dark">
          <Checkbox />
        </div>
        {headers.map((header) => (
          <div className="p-2 border border-border dark:border-shadow-dark">
            {header}
          </div>
        ))}
      </div>

      {/* Filas con grid */}
      <div className="min-w-[800px]">
        {requests.map((request, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_4fr_2fr_8fr_2.5fr] bg-black-02 hover:bg-black-05 dark:hover:bg-white-10"
          >
            {/* Checkbox */}
            <div className="p-2 border border-border dark:border-shadow-dark ">
              <Checkbox />
            </div>

            {/* DNI */}
            <div className="p-2 border border-border dark:border-shadow-dark">
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

                    // 1. Permite cualquier input pero detecta si hay caracteres no numéricos
                    const hasInvalidChars = /[^0-9]/.test(value);
                    const length = value.length;

                    // 2. Actualiza el estado de error
                    setInputErrors((prev) => ({
                      ...prev,
                      dni: { ...prev.dni, [index]: (hasInvalidChars || length>=9 || length<=7) },
                    }));

                    // 3. Siempre actualiza el estado (permite borrado/corrección)
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

            {/* Nombres completos */}
            <div className="p-2 border border-border dark:border-shadow-dark">
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

                  // 1. Verifica si hay dígitos numéricos (0-9)
                  const hasNumbers = /[0-9]/.test(value);

                  // 2. Actualiza el estado de error
                  setInputErrors((prev) => ({
                    ...prev,
                    fullname: { ...prev.fullname, [index]: hasNumbers },
                  }));

                  // 3. Siempre actualiza el valor (permite corrección)
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

            {/* Teléfono */}
            <div className="p-2 border border-border dark:border-shadow-dark">
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

                    // 1. Permite cualquier input pero detecta si hay caracteres no numéricos
                    const hasInvalidChars = /[^0-9]/.test(value);
                    const length = value.length;

                    // 2. Actualiza el estado de error
                    setInputErrors((prev) => ({
                      ...prev,
                      phone: { ...prev.phone, [index]: hasInvalidChars || length>=10 || length<=8 },
                    }));

                    // 3. Siempre actualiza el estado (permite borrado/corrección)
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

            {/* Acciones */}
            <div className="p-2 border border-border dark:border-shadow-dark flex justify-around items-start gap-1">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="
                  py-0.5 px-1
                  cursor-pointer 
                  bg-white 
                  border border-black hover:border-green
                  hover:text-green 
                  rounded-[5px]
                "
              >
                Confirmar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer hover:text-red"
              >
                <FaDeleteLeft className="w-[24px] h-[24px]" />
              </motion.button>
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
