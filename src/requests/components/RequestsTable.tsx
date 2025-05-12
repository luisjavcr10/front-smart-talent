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
            <thead className="bg-cream dark:bg-black-0 text-black dark:text-white">
            <tr>
                <th className="text-start p-2 border border-black-05 dark:border-shadow-dark">#</th>
                <th className="text-start p-2 border border-black-05 dark:border-shadow-dark">DNI</th>
                <th className="text-start p-2 border border-black-05 dark:border-shadow-dark">Nombre Completo</th>
                <th className="text-start p-2 border border-black-05 dark:border-shadow-dark">Estado</th>
                <th className="text-start p-2 border border-black-05 dark:border-shadow-dark">Documentos</th>
                <th className="text-start p-2 border border-black-05 dark:border-shadow-dark">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {requests.map((request, index) => (
                <tr key={index} className="hover:bg-black-05 dark:bg-white-10">
                <td className="p-2  border border-black-05 dark:border-shadow-dark ">{index + 1}</td>
                <td className="p-2  border border-black-05 dark:border-shadow-dark ">{request.dni}</td>
                <td className="p-2  border border-black-05 dark:border-shadow-dark ">{request.fullname}</td>
                <td className="p-2  border border-black-05 dark:border-shadow-dark ">
                    <span className={`status-${request.state.toLowerCase()}`}>
                    {request.state}
                    </span>
                </td>
                <td className="p-2  border border-black-05 dark:border-shadow-dark ">
                    <div className="flex flex-wrap gap-1">
                    {request.docs.map((doc, docIndex) => (
                        <span 
                        key={docIndex} 
                        className={`${doc.state? 'bg-green text-white': 'bg-transparent  border border-black-05 dark:border-shadow-dark text-black dark:text-white'}  py-0.5 px-2 rounded-[5px]`}
                        >
                        {doc.name}
                        </span>
                    ))}
                    </div>
                </td>
                <td className="p-2 border border-black-05 dark:border-shadow-dark">
                    <button className="cursor-pointer">Ver</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}