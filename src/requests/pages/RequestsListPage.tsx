import { useState } from "react";
import { OptionsModal } from "../components/OptionsModal";
import { FiPlusCircle } from "react-icons/fi";
import { RequestsTable } from "../components/RequestsTable";

export function RequestsListPage() {
    const [isActive, setIsActive] = useState(false);
    
    return(
        <div className="flex flex-col mx-12 my-15 gap-11">
            <div 
                className="
                    flex flex-row justify-between items-center
                    w-full
                    text-black dark:text-white">
                <h1 className="font-bebasneue text-[64px]">LISTA DE SOLICITUDES</h1>
                <button onClick={()=>setIsActive(!isActive)}>
                    <FiPlusCircle className="w-[60px] h-[60px] hover:text-orange-50"/>
                </button>
            </div>

            <div className="w-full h-[550px] bg-white dark:bg-white-10 text-[12px] overflow-x-auto relative">
                <RequestsTable />
                <OptionsModal isActive={isActive} handleActive={()=>setIsActive(!isActive)}/>
                
            </div>
        </div>
    )
}