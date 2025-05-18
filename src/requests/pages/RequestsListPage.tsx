import { useState } from "react";
import { OptionsModal } from "../components/private/list/OptionsModal";
import { FiPlusCircle } from "react-icons/fi";
import { RequestsTable } from "../components/private/list/RequestsTable";

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
        <div className="flex flex-col mx-5 md:mx-12 my-15 gap-11">
            <div 
                className="
                    flex flex-row justify-between items-center
                    w-full mt-5 md:mt-0
                    text-black dark:text-white">
                <h1 className="font-karla text-[32px] md:text-[36px] xl:text-[36px]">LISTA DE SOLICITUDES</h1>
                <button onClick={()=>setIsActive(true)}>
                    <FiPlusCircle className="w-[30px] md:w-[40px] lg:w-[50px] xl:w-[60px] h-[30px] md:h-[40px] lg:h-[50px] xl:h-[60px] hover:text-orange-50"/>
                </button>
            </div>

            <div className="w-full h-[500px] shadow-doc-options bg-white dark:bg-white-10 text-[12px] overflow-x-auto relative">
                <RequestsTable data={requests}/>
                <OptionsModal isActive={isActive} handleActive={()=>setIsActive(!isActive)}/>
                
            </div>
        </div>
    )
}