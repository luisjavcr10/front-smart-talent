import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const OptionsModal = ({
    isActive,
    handleActive
}:Readonly<{
    isActive:boolean,
    handleActive:()=>void
}>) =>{

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleActive();
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, handleActive])

    return(
        <AnimatePresence>
            {isActive && (
            <motion.div
                key="modal"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{
                type: "spring",
                damping: 15,
                stiffness: 150,
                mass: 0.8
                }}
                className="absolute bottom-0 left-0 right-0 bg-white dark:bg-background rounded-t-[24px] shadow-medium p-5 z-10 text-black dark:text-white border border-transparent dark:border-x-shadow-dark dark:border-t-shadow-dark"
                ref={modalRef}
            >
                <div className="flex flex-col items-center justify-center gap-5">
                <p className="text-center">
                    Seleccione el método de ingreso de datos
                </p>
                
                <div className="flex flex-col gap-3 w-full max-w-md">
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="bg-orange-20 dark:bg-white-10 hover:bg-orange-50 py-2 px-4 w-full rounded-[24px] shadow-full text-[16px] transition-colors border border-transparent dark:border-shadow-dark "
                    >
                        Registrar manualmente
                    </motion.button>
                    <p className="text-center">o</p>
                    <div className="flex flex-col items-center">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="bg-orange-20 dark:bg-white-10 hover:bg-orange-50 py-2 px-4 w-full rounded-[24px] shadow-full text-[16px] transition-colors border border-transparent dark:border-shadow-dark "
                        >
                            Importar archivo
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="bg-orange-25 dark:bg-white-10 hover:bg-orange-50 py-2 px-4 w-3/4 
                            rounded-b-[24px] shadow-full  text-[16px] transition-colors border border-transparent dark:border-shadow-dark"
                        >
                            Descargar plantilla
                        </motion.button>
                    </div>
                    
                    
                </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
    )
}