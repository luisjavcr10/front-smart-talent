import { FiPlusCircle } from "react-icons/fi";

export function RequestsListPage() {
    return(
        <div className="flex flex-col mx-20 my-15 gap-11">
            <div 
                className="
                    flex flex-row justify-between items-center
                    w-full
                    text-black dark:text-white">
                <h1 className="font-bebasneue text-[64px]">LISTA DE SOLICITUDES</h1>
                <FiPlusCircle className="w-[60px] h-[60px]"/>
            </div>

            <div className="w-full h-96 bg-white dark:bg-white-10">
                
            </div>
        </div>
    )
}