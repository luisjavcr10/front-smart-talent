import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export const OptionsModal = ({
  isActive,
  handleActive,
}: Readonly<{
  isActive: boolean;
  handleActive: () => void;
}>) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleActive();
      }
    };

      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'hidden';
      
      if (containerRef.current && containerRef.current.parentElement) {
        containerRef.current.parentElement.style.overflow = 'hidden';
      }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
      
      if (containerRef.current && containerRef.current.parentElement) {
        containerRef.current.parentElement.style.overflow = '';
      }
    };
  }, [isActive, handleActive]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key="modal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-black rounded-t-sidebar shadow-optionsmodal p-5 z-10 text-black dark:text-white border border-transparent dark:border-x-black-1 dark:border-t-black-1 font-karla overflow-hidden will-change-transform"
            ref={modalRef}
          >
            <div className="flex flex-col items-center justify-center gap-5 mb-10">
              <p className="text-center text-[12px] font-light">
                SELECCIONA EL MÉTODO DE INGRESO DE DATOS
              </p>

            <div className="flex flex-col gap-3 w-full max-w-md">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={()=>(
                    handleActive(),
                    navigate("/requests/create")
                )}
                className="bg-main-1plus dark:bg-white-10 hover:bg-main py-2 px-4 w-full rounded-sidebar text-[16px] transition-colors border border-transparent dark:border-shadow-dark "
              >
                <p className="text-[14px] font-light">Registrar manualmente</p>
              </motion.button>

                <p className="text-center text-[12px] font-light">O</p>
                
                <div className="flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="bg-main-1plus dark:bg-white-10 hover:bg-main py-2 px-4 w-full rounded-sidebar text-[16px] transition-colors border border-transparent dark:border-shadow-dark "
                  >
                    <p className="text-[14px] font-light">Importar archivo</p>
                  </motion.button>
                  {/**<motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className="bg-orange-25 dark:bg-white-10 hover:bg-orange-50 py-2 px-4 w-3/4 
                              rounded-b-[24px] shadow-full  text-[16px] transition-colors border border-transparent dark:border-shadow-dark"
                          >
                              <p className="text-[14px] font-light">Descargar plantilla</p>
                          </motion.button>**/}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
