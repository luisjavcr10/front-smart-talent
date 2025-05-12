import { Checkbox } from "@/components/ui/checkbox"

const requests= [
    {
        dni:'70926081',
        fullname:'Luis Castillo Rabanal',
        phone:'999999999',
        docs:[
            {
                name:'Verificación Domiciliaria',
                state:false
            },
            {
                name:'Verificación Laboral',
                state:false
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
        phone:'999999999',
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

export function RequestsCreationPage () {
    return(
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
                {requests.map((request, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border border-black-05"><Checkbox/></td>
                    <td className="p-2 border border-black-05">{request.dni}</td>
                    <td className="p-2 border border-black-05">{request.fullname}</td>
                    <td className="p-2 border border-black-05">
                        <div className="flex flex-wrap gap-1">
                        {request.docs.map((doc, docIndex) => (
                            <span 
                            key={docIndex} 
                            className='bg-transparent border border-black-05 text-black py-0.5 px-2 rounded-[5px]'
                            >
                            {doc.name}
                            </span>
                        ))}
                        <span  
                            className='bg-transparent border border-black-05 text-black py-0.5 px-2 rounded-[5px]'
                            >
                            +
                            </span>
                        </div>
                    </td>
                    <td className="p-2 border border-black-05">
                        <button className="cursor-pointer">Confirmar</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}