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

export const RequestsTable = () => {
    const [openRows, setOpenRows] = useState<number[]>([]);
    
    const handleToggleRow = (index: number) => {
        setOpenRows((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    // Clases reutilizables
    const commonCellStyles = "p-2 border border-black-05 dark:border-shadow-dark";
    const hiddenOnMobile = "hidden md:table-cell";
    const docStatusStyle = (state: boolean) => 
        `${state ? 'bg-green text-white' : 'bg-transparent border border-black-05 dark:border-shadow-dark text-black dark:text-white'} py-0.5 px-2 rounded-[5px]`;

    return (
        <table className="w-full">
            <thead className="bg-cream dark:bg-black-0 text-black dark:text-white">
                <tr>
                    {["#", "DNI", "Nombre Completo", "Estado", "Documentos", "Acciones"].map((header, idx) => (
                        <th 
                            key={header}
                            className={`text-start ${commonCellStyles} ${
                                idx >= 3 ? hiddenOnMobile : ""
                            }`}
                        >
                            {header}
                        </th>
                    ))}
                    <th className={`text-start ${commonCellStyles} md:hidden`}>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-black dark:text-white">
                {requests.map((request, index) => (
                    <>
                        {/* Fila normal (visible en desktop) */}
                        <tr key={index} className="hover:bg-black-15">
                            <td className={commonCellStyles}>{index + 1}</td>
                            <td className={commonCellStyles}>{request.dni}</td>
                            <td className={commonCellStyles}>{request.fullname}</td>
                            <td className={`${commonCellStyles} ${hiddenOnMobile}`}>
                                <span>{request.state}</span>
                            </td>
                            <td className={`${commonCellStyles} ${hiddenOnMobile}`}>
                                <div className="flex flex-wrap gap-1">
                                    {request.docs.map((doc, docIndex) => (
                                        <span key={docIndex} className={docStatusStyle(doc.state)}>
                                            {doc.name}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className={`${commonCellStyles} ${hiddenOnMobile}`}>
                                <button className="cursor-pointer">Ver</button>
                            </td>
                            <td className={`${commonCellStyles} md:hidden`}>
                                <button onClick={() => handleToggleRow(index)}>
                                    {openRows.includes(index) ? "Cerrar" : "Expandir"}
                                </button>
                            </td>
                        </tr>

                        {/* Fila expandida (solo móvil) */}
                        {openRows.includes(index) && (
                            <tr className="md:hidden">
                                <td colSpan={7} className={commonCellStyles}>
                                    <div className="flex flex-col gap-2 mx-4 my-2">
                                        <p>Estado: <strong>{request.state}</strong></p>
                                        <p>Documentos solicitados:</p>
                                        <div className="flex flex-col gap-1 items-center">
                                            {request.docs.map((doc, docIndex) => (
                                                <span 
                                                    key={docIndex} 
                                                    className={`w-full ${docStatusStyle(doc.state)} text-center`}
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