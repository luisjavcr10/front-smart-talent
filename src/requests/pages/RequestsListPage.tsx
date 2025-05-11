import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

                <AnimatePresence>
                    {isActive && (
                    <motion.div
                        key="modal"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                        mass: 0.5
                        }}
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-medium p-5 z-10"
                    >
                        <div className="flex flex-col items-center justify-center gap-5">
                        <p className="text-center">
                            Seleccione el método de ingreso de datos
                        </p>
                        
                        <div className="flex flex-col gap-3 w-full max-w-md">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="bg-orange-20 hover:bg-orange-50 py-2 px-4 w-full rounded-[24px] shadow-full text-[16px] font-medium transition-colors "
                            >
                                Registrar manualmente
                            </motion.button>
                            
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="bg-orange-20 hover:bg-orange-50 py-2 px-4 w-full rounded-[24px] shadow-full text-[16px] font-medium transition-colors f"
                            >
                                Importar archivo
                            </motion.button>
                        </div>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}