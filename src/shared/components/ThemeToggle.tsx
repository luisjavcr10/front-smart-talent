import { useTheme } from "../hooks/useTheme";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { FaLaptop } from "react-icons/fa6";

export default function ThemeToggle({position}: Readonly<{position:string}>) {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(nextTheme);
  };

  const icon = {
    light: <MdOutlineLightMode />,
    dark: <MdOutlineDarkMode />,
    system: <FaLaptop />,
  }[theme];

  return (
    <button
      onClick={handleToggle}
      className={`fixed top-4 z-50 p-2 rounded-xl text-xl bg-orange text-white dark:bg-orange-50 transition-colors ${position === "left" ? "left-4" : "right-4"}`}
      title={`Tema actual: ${theme}`}
    >
      {icon}
    </button>
  );
}
