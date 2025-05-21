import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../shared/components/ThemeToggle";
import { Logotipo } from "@/shared/components/Logotipo";
import { motion } from "framer-motion";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <main
        className="
                flex flex-col justify-center items-center
                bg-white dark:bg-black
                h-screen w-full 
                text-black dark:text-white"
      >
        <Logotipo where="notfound" />

        <div className="flex flex-row gap-10 mt-8">
          <motion.button
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="hover:bg-white-1 dark:hover:bg-black-2 border border-white-1 dark:border-black-2 rounded-[15px]  px-8 py-2"
          >
            Volver atras
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="bg-main hover:bg-main-1plus rounded-[15px] px-8 py-2"
          >
            Ir al inicio
          </motion.button>
        </div>
      </main>
      <ThemeToggle position="left" />
    </>
  );
}
