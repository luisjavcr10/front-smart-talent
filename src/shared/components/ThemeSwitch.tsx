import { useTheme } from "../hooks/useTheme";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { FaLaptop } from "react-icons/fa6";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex dark:bg-black border border-medium rounded-[16px]">
      <button 
        onClick={()=>setTheme('system')}
        className={`p-0.5 ${theme==='system'? 'border-r border-y border-medium rounded-full':''}`}>
        <FaLaptop />
      </button>
      <button 
        onClick={()=>setTheme('light')}
        className={`p-0.5 ${theme==='light'?'border border-medium rounded-full':''}`}>
        <MdOutlineLightMode />
      </button>
      <button 
        onClick={()=>setTheme('dark')}
        className={`p-0.5 ${theme==='dark'? 'border-l border-y border-medium rounded-full':''}`}>
        <MdOutlineDarkMode />
      </button>
    </div>
  );
};