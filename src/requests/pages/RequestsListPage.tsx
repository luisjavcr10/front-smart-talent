import { OptionsModal } from "../components/private/list/OptionsModal";
import { RequestsTable } from "../components/private/list/RequestsTable";
import {motion} from "framer-motion"
import { useModalStore } from "../../store/modalStore";
import { useEffect, useState } from "react";
import { Request, requestsService } from "../services/requestsService";
import { useHasRole } from "@/auth/hooks/useUser";
import { ROLES } from "@/auth/constants/roles";

export function RequestsListPage() {
    const { isActive, setIsActive } = useModalStore();
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const isAdmin = useHasRole(ROLES.ADMIN);
    
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await requestsService.getAllPeople();
                setRequests(data.people);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar las solicitudes');
                setLoading(false);
            }
        };
        
        fetchRequests();
    }, []);
    
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
                    className="bg-main-1plus dark:bg-main hover:bg-main dark:hover:bg-main-1plus rounded-sidebar py-2 px-8 text-[14px] font-light"
                    onClick={()=>setIsActive(true)}>
                    Agregar nueva solicitud
                </motion.button>
            </div>

            <div className="w-full h-[500px] p-3 rounded-sidebar shadow-doc-options bg-white dark:bg-black dark:border dark:border-black-1 text-[12px] overflow-x-auto relative">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p>Cargando solicitudes...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : (
                    <RequestsTable 
                        data={requests} 
                        isAdmin={isAdmin} 
                    />
                )}
                <OptionsModal isActive={isActive} handleActive={()=>setIsActive(!isActive)}/>
            </div>
        </div>
    );
}