import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function RequestsCreationPage() {
    const [requests, setRequests] = useState<any>([])
    const [openOptions, setOpenOptions] = useState<boolean>(false)

    const toggleOpenOptions = () => {
        setOpenOptions(!openOptions)
    }

    const addRow = () => {
        setRequests([...requests, {
            dni: '',
            fullname: '',
            phone: '',
            docs: []
        }])
    }

    return (
        <div className="flex flex-col mx-12 my-15 gap-11">
            <h1 className="font-bebasneue text-[64px]">CREACIÓN DE SOLICITUDES</h1>
            <div className="w-full h-[550px] bg-white dark:bg-white-10 text-[12px] overflow-x-auto relative">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-cream">
                        <tr>
                            <th className="text-start p-2 border border-black-05"></th>
                            <th className="text-start p-2 border border-black-05">DNI</th>
                            <th className="text-start p-2 border border-black-05">Nombre Completo</th>
                            <th className="text-start p-2 border border-black-05">Documentos</th>
                            <th className="text-start p-2 border border-black-05">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request: any, index: any) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="p-2 border border-black-05"><Checkbox /></td>
                                <td className="p-2 border border-black-05">
                                    <input
                                        type="text"
                                        value={request.dni}
                                        onChange={(e: any) => {
                                            const newRequests = [...requests];
                                            newRequests[index].dni = e.target.value;
                                            setRequests(newRequests);
                                        }}
                                    />
                                </td>
                                <td className="p-2 border border-black-05">
                                    <input
                                        type="text"
                                        value={request.fullname}
                                        onChange={(e: any) => {
                                            const newRequests = [...requests];
                                            newRequests[index].fullname = e.target.value;
                                            setRequests(newRequests);
                                        }}
                                    />
                                </td>
                                <td className="p-2 border border-black-05">
                                    <div className="flex flex-wrap gap-1">
                                        {request.docs.map((doc: any, docIndex: any) => (
                                            <span
                                                key={docIndex}
                                                className='bg-transparent border border-black-05 text-black py-0.5 px-2 rounded-[5px]'
                                            >
                                                {doc.name}
                                            </span>
                                        ))}
                                        <span
                                            className='bg-transparent border border-black-05 text-black py-0.5 px-2 rounded-[5px]'
                                            onClick={toggleOpenOptions}
                                        >
                                            +
                                        </span>

                                        {openOptions && (
                                            <div className="relative top-0 left-12">
                                                <div className="absolute flex flex-col gap-1 bg-white rounded-[4px] shadow-doc-options border border-shadow-dark">
                                                    <div className="flex justify-between items-center  px-2 cursor-pointer border-b border-b-black-05">
                                                        <span>Verificación Domiciliaria</span>
                                                        <Checkbox />
                                                    </div>
                                                    <div className="flex justify-between items-center px-2 cursor-pointer border-b border-b-black-05">
                                                        <span>Verificación Laboral</span>
                                                        <Checkbox />
                                                    </div>
                                                    <div className="flex justify-between items-center px-2 cursor-pointer border-b border-b-black-05">
                                                        <span>Antecedentes penales</span>
                                                        <Checkbox />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-2 border border-black-05">
                                    <button className="cursor-pointer">Confirmar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={addRow}>
                    +
                </button>
            </div>
        </div>
    )
}