const requests= [
    {
        dni:'70926081',
        fullname:'Luis Castillo Rabanal',
        state:'Pendiente',
        docs:[
            {
                name:'Verificación Domiciliaria',
                state:true
            },
            {
                name:'Verificación Laboral',
                state:true
            },
            {
                name:'Antecedentes penales',
                state:false
            }
        ]
    },
    {
        dni:'70251318',
        fullname:'Alexander Huamanchumo Gordillo',
        state:'Pendiente',
        docs:[
            {
                name:'Verificación Domiciliaria',
                state:true
            },
            {
                name:'Verificación Laboral',
                state:false
            }
        ]
    }
]

import { useState } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { FaChevronCircleDown } from "react-icons/fa";

export const RequestsTable = () => {
    const [openRows, setOpenRows] = useState<number[]>([]);
    
    const handleToggleRow = (index: number) => {
        setOpenRows((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <table className="w-full">
            <thead className="bg-cream dark:bg-black-0 text-black dark:text-white">
                <tr>
                    {["#", "DNI", "Nombre Completo", "Estado", "Documentos", "Acciones"].map((header, idx) => (
                        <th 
                            key={header}
                            className={`text-start p-2 border border-black-05 dark:border-shadow-dark ${
                                idx >= 3 ? "hidden md:table-cell" : ""
                            }`}
                        >
                            {header}
                        </th>
                    ))}
                    <th className={`text-start p-2 border border-black-05 dark:border-shadow-dark md:hidden`}>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-black dark:text-white">
                {requests.map((request, index) => (
                    <>
                        {/* Fila normal (visible en desktop) */}
                        <tr key={index} className="hover:bg-black-05 dark:hover:bg-white-10">
                            <td className="p-2 border border-black-05 dark:border-shadow-dark">{index + 1}</td>
                            <td className="p-2 border border-black-05 dark:border-shadow-dark">{request.dni}</td>
                            <td className="p-2 border border-black-05 dark:border-shadow-dark">{request.fullname}</td>
                            <td className={`p-2 border border-black-05 dark:border-shadow-dark ${"hidden md:table-cell"}`}>
                                <span>{request.state}</span>
                            </td>
                            <td className={`p-2 border border-black-05 dark:border-shadow-dark hidden md:table-cell`}>
                                <div className="flex flex-wrap gap-1">
                                    {request.docs.map((doc, docIndex) => (
                                        <span key={docIndex} className={`${doc.state ? 'bg-green text-white' : 'bg-transparent border border-black-05 dark:border-shadow-dark text-black dark:text-white'} py-0.5 px-2 rounded-[5px]`}>
                                            {doc.name}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className={`p-2 border border-black-05 dark:border-shadow-dark hidden md:table-cell text-center`}>
                                <button title="Ver detalles de solicitud" className="cursor-pointer text-center hover:text-orange"><HiOutlineDocumentSearch className="w-[24px] h-[24px]"/></button>
                            </td>
                            <td className={`p-2 border border-black-05 dark:border-shadow-dark md:hidden text-center`}>
                            <button
                                className="text-center" 
                                onClick={() => handleToggleRow(index)}
                            >
                                <FaChevronCircleDown 
                                    className={`w-[20px] h-[20px] transform origin-center transition-all duration-500 ease-in-out ${openRows.includes(index) ? "rotate-180" : ""}`} 
                                />
                            </button>
                            </td>
                        </tr>

                        {/* Fila expandida (solo móvil) */}
                        {openRows.includes(index) && (
                            <tr className="md:hidden">
                                <td colSpan={7} className="p-2 border border-black-05 dark:border-shadow-dark">
                                    <div className="flex flex-col gap-2 mx-4 my-2">
                                        <p>Estado: <strong>{request.state}</strong></p>
                                        <p>Documentos solicitados:</p>
                                        <div className="flex flex-col gap-1 items-center">
                                            {request.docs.map((doc, docIndex) => (
                                                <span 
                                                    key={docIndex} 
                                                    className={`w-full ${doc.state ? 'bg-green text-white' : 'bg-transparent border border-black-05 dark:border-shadow-dark text-black dark:text-white'} py-0.5 px-2 rounded-[5px] text-center`}
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
                                </td>
                            </tr>
                        )}
                    </>
                ))}
            </tbody>
        </table>
    )
}