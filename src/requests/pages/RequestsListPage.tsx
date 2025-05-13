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
                    w-full mt-5 md:mt-0
                    text-black dark:text-white">
                <h1 className="font-bebasneue text-[32px] md:text-[48px] xl:text-[64px]">LISTA DE SOLICITUDES</h1>
                <button onClick={()=>setIsActive(true)}>
                    <FiPlusCircle className="w-[30px] md:w-[40px] lg:w-[50px] xl:w-[60px] h-[30px] md:h-[40px] lg:h-[50px] xl:h-[60px] hover:text-orange-50"/>
                </button>
            </div>

            <div className="w-full h-[500px] bg-white dark:bg-white-10 text-[12px] overflow-x-auto relative">
                <RequestsTable />
                <OptionsModal isActive={isActive} handleActive={()=>setIsActive(!isActive)}/>
                
            </div>
        </div>
    )
}