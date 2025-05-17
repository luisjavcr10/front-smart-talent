import { motion } from "framer-motion";
import { GoPlus } from "react-icons/go";

export const AddRequestButton = ({addRow}:Readonly<{addRow:()=>void}>) =>{
    return(
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-tranparent border hover:bg-border border-black dark:border-white rounded-[5px]"
          onClick={addRow}
        >
          <GoPlus className="w-[25px] h-[25px]" />
        </motion.button>
    );
}