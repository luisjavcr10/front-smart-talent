import { motion } from "framer-motion";
import { GoPlus } from "react-icons/go";

export const AddButton = ({
    type,
    onClick
}:Readonly<{
    type: "document" | "request"
    onClick:()=>void
}>) =>{
    return(
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-white dark:bg-transparent border border-black dark:border-white rounded-[5px] ${type=== 'document'? 'ml-auto':''}`}
          onClick={onClick}
        >
          <GoPlus className={`${type=== 'document'?'w-[20px] h-[20px]':'w-[25px] h-[25px]'}`} />
        </motion.button>
    );
}