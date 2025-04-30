import { useState } from 'react';
import { TbFileDollar, TbFileDescription, TbLogout, TbList, TbPlaylistAdd, TbCaretDownFilled } from "react-icons/tb";

const menuItemClasses = "w-full flex flex-row justify-start items-center gap-2 py-3.5 hover:bg-black-1 border-b border-orange";
const iconClasses = "w-[30px] h-[30px]";
const subMenuItemClasses = `${menuItemClasses} bg-white-10 px-10`;

export const Sidebar = () => {
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);

  const toggleRequestsMenu = () => {
    setIsRequestsOpen(!isRequestsOpen);
  };

  const mainMenuItems = [
    { 
      icon: <TbFileDescription className={iconClasses} />, 
      text: "Solicitudes", 
      px: "px-4", 
      bg: "bg-gray dark:bg-background",
      action: toggleRequestsMenu,
      chevron: (
        <div className={`transition-all duration-300 transform ${isRequestsOpen ? 'rotate-180' : 'rotate-0'}`}>
          <TbCaretDownFilled className="w-[25px] h-[25px]" />
        </div>
      )
    },
    { 
      icon: <TbFileDollar className={iconClasses} />, 
      text: "Facturación", 
      px: "px-4", 
      bg: "bg-gray dark:bg-background",
      action: null
    },
    { 
      icon: <TbLogout className={iconClasses} />, 
      text: "Cerrar Sesión", 
      px: "px-4", 
      bg: "bg-gray dark:bg-background",
      action: null
    }
  ];

  const requestsSubMenu = [
    { icon: <TbList className={iconClasses} />, text: "Lista de Solicitudes" },
    { icon: <TbPlaylistAdd className={iconClasses} />, text: "Agregar Solicitud" }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-80 bg-white dark:bg-black-1 flex flex-col items-center py-10 gap-14 text-black dark:text-white font-bevietnampro">
      <img className="w-3/5" src="/images/logo-black.png" alt="logo" />
      
      <div className="flex flex-col justify-center items-center gap-5">
        <img className="w-[60px] h-[60px]" src="/images/profile.png" alt="profile" />
        <p>Ally Lecca</p>
      </div>

      <div className="flex flex-col w-full border-t border-orange">
        {mainMenuItems.map((item, index) => (
          <div key={index}>
            <div 
              className={`${menuItemClasses} ${item.px} ${item.bg} cursor-pointer`}
              onClick={item.action || undefined}
            >
              {item.icon}
              {item.text}
              {item.chevron && <span className="ml-auto">{item.chevron}</span>}
            </div>
            
            {item.text === "Solicitudes" && isRequestsOpen && (
              <div className="transition-all duration-300 ease-in-out">
                {requestsSubMenu.map((subItem, subIndex) => (
                  <div key={subIndex} className={subMenuItemClasses}>
                    {subItem.icon}
                    {subItem.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>         
    </div>
  );
};