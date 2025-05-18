import { useState } from "react";
import { OptionsModal } from "../components/private/list/OptionsModal";
import { RequestsTable } from "../components/private/list/RequestsTable";
import {motion} from "framer-motion"

const requests= [
    {
        propietario:'1',
        dni:'70926081',
        fullname:'Luis Castillo Rabanal',
        state:'Pendiente',
        phone:'984214874',
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
        propietario:'1',
        dni:'70251318',
        fullname:'Alexander Huamanchumo Gordillo',
        state:'Pendiente',
        phone:'984214874',
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

export function RequestsListPage() {
    const [isActive, setIsActive] = useState(false);
    
    return(
        <div className="flex flex-col mx-5 md:mx-8 my-15 gap-11">
            <div 
                className="
                    flex flex-row justify-between items-center
                    w-full mt-5 md:mt-0
                    text-black dark:text-white"
            >
                <div>
                    <p className="font-karla text-[32px] md:text-[36px] xl:text-[36px]">LISTA DE SOLICITUDES</p>
                    <p className="text-[12px] font-light">Visualiza tus solicitudes, su estado y los documentos requeridos.</p>
                </div>
                
                <motion.button 
                    whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-main-1plus hover:bg-main rounded-sidebar py-2 px-8 text-[14px] font-light"
                    onClick={()=>setIsActive(true)}>
                    Agregar nueva solicitud
                </motion.button>
            </div>

            <div className="w-full h-[500px] p-3 rounded-sidebar shadow-doc-options bg-white dark:bg-white-10 text-[12px] overflow-x-auto relative">
                <RequestsTable data={requests}/>
                <OptionsModal isActive={isActive} handleActive={()=>setIsActive(!isActive)}/>
                
            </div>
        </div>
    )
}