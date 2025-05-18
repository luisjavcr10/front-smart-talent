import { useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import { RequestsBody } from "@/requests/types/RequestBody";

export const RequestsTable = ({
  data,
}: Readonly<{
  data: RequestsBody[];
}>) => {
  const [openRows, setOpenRows] = useState<number[]>([]);

  const handleToggleRow = (index: number) => {
    setOpenRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full text-[14px] font-karla font-light">
      {/* Header */}
      <div className="px-2 grid grid-cols-12 gap-0 bg-main-3plus dark:bg-black-0 text-black dark:text-white rounded-sidebar mb-4">
        <div className="col-span-1 p-2">DNI</div>
        <div className="col-span-3 p-2 hidden md:block">Nombre Completo</div>
        <div className="col-span-1 p-2 hidden md:block">Estado</div>
        <div className="col-span-6 p-2 hidden md:block">Documentos</div>
        <div className="col-span-1 p-2 hidden md:block">Acciones</div>
        <div className="col-span-1 p-2 md:hidden">Acciones</div>
      </div>

      {/* Rows */}
      <div className="text-black dark:text-white flex flex-col gap-2">
        {data.map((request, index) => (
          <div key={index}>
            {/* Main Row */}
            <div className="px-2 grid grid-cols-12 border border-white-1 rounded-sidebar hover:bg-black-05 dark:hover:bg-white-10">
              <div className="col-span-1 p-2 ">
                {request.dni}
              </div>
              <div className="col-span-3 p-2 ">
                {request.fullname}
              </div>
              <div className="col-span-1 p-2  hidden md:block">
                <span>{request.state}</span>
              </div>
              <div className="col-span-6 p-2  hidden md:block">
                <div className="flex flex-wrap gap-1">
                  {request.docs.map((doc, docIndex) => (
                    <span
                      key={docIndex}
                      className={`${
                        doc.state
                          ? "bg-green text-white"
                          : "bg-transparent  text-black dark:text-white"
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
                    className={`w-[20px] h-[20px] transform origin-center transition-all duration-500 ease-in-out ${
                      openRows.includes(index) ? "rotate-180" : ""
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
                      Estado: <strong>{request.state}</strong>
                    </p>
                    <p>Documentos solicitados:</p>
                    <div className="flex flex-col gap-1 items-center">
                      {request.docs.map((doc, docIndex) => (
                        <span
                          key={docIndex}
                          className={`w-full ${
                            doc.state
                              ? "bg-green text-white"
                              : "bg-transparent border border-black-05 dark:border-shadow-dark text-black dark:text-white"
                          } py-0.5 px-2 rounded-[5px] text-center`}
                        >
                          {doc.name}
                        </span>
                      ))}
                    </div>
                    <div className="w-full flex justify-end mt-2">
                      <button className="py-0.5 px-2 bg-black-15 dark:bg-white-20 rounded-[5px]">
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
    </div>
  );
};