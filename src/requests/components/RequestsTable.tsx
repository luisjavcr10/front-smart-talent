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

export const RequestsTable = () =>{
    return(
        <table className="w-full min-w-[800px]">
            <thead className="bg-cream">
            <tr>
                <th className="text-start p-2 border border-black-05">#</th>
                <th className="text-start p-2 border border-black-05">DNI</th>
                <th className="text-start p-2 border border-black-05">Nombre Completo</th>
                <th className="text-start p-2 border border-black-05">Estado</th>
                <th className="text-start p-2 border border-black-05">Documentos</th>
                <th className="text-start p-2 border border-black-05">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {requests.map((request, index) => (
                <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border border-black-05">{index + 1}</td>
                <td className="p-2 border border-black-05">{request.dni}</td>
                <td className="p-2 border border-black-05">{request.fullname}</td>
                <td className="p-2 border border-black-05">
                    <span className={`status-${request.state.toLowerCase()}`}>
                    {request.state}
                    </span>
                </td>
                <td className="p-2 border border-black-05">
                    <div className="flex flex-wrap gap-1">
                    {request.docs.map((doc, docIndex) => (
                        <span 
                        key={docIndex} 
                        className={`${doc.state? 'bg-green text-white': 'bg-transparent border border-black-05 text-black'}  py-0.5 px-2 rounded-[5px]`}
                        >
                        {doc.name}
                        </span>
                    ))}
                    </div>
                </td>
                <td className="p-2 border border-black-05">
                    <button className="cursor-pointer">Ver</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}