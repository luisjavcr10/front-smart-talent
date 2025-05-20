import { motion } from "framer-motion";
export const CreationButton = () => {
  return (
    <div className="flex justify-end">
      <motion.button
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
        className="bg-main-1plus dark:bg-main hover:bg-main dark:hover:bg-main-1plus rounded-sidebar my-5 py-2 px-16 text-[14px] font-light"
      >
        Confirmar registro
      </motion.button>
    </div>
  );
};
