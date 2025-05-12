import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TbFileDollar, TbFileDescription, TbLogout, TbList, TbPlaylistAdd, TbCaretDownFilled } from "react-icons/tb";
import { storage } from '../utils/storage';
import { SidebarToggle } from './SidebarToggle';
import { Logotipo } from './Logotipo';

const iconClasses = "w-[30px] h-[30px]";

export const Sidebar = () => {
  const navigate = useNavigate();
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleRequestsMenu = () => {
    setIsRequestsOpen(!isRequestsOpen);
  };

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () =>{
    storage.clearToken();
    navigate('/login');
  };

  const mainMenuItems = [
    { 
      icon: <TbFileDescription className='w-[30px] h-[30px]' />, 
      text: "Solicitudes", 
      action: toggleRequestsMenu,
      chevron: (
        <div className={`transition-all duration-300 transform ${isRequestsOpen ? 'rotate-180' : 'rotate-0'}`}>
          <TbCaretDownFilled className="w-[25px] h-[25px]" />
        </div>
      )
    },
    { 
      icon: <TbFileDollar className='w-[30px] h-[30px]' />, 
      text: "Facturación",
      action: null
    }
  ];

  const requestsSubMenu = [
    { icon: <TbList className={iconClasses} />, text: "Lista de Solicitudes" },
    { icon: <TbPlaylistAdd className={iconClasses} />, text: "Agregar Solicitud" }
  ];

  return (
    <>
      <aside 
        className={`
          fixed xl:relative inset-y-0 left-0 z-40 
          w-96 h-screen
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 max-w-72' : '-translate-x-full xl:translate-x-0'}
          bg-white dark:bg-black-1 
          flex flex-col items-center 
          py-10 gap-14
          text-black dark:text-white 
          font-bevietnampro 
          border-r-none rounded-r-[24px] shadow-sidebar`}
      >
        <div className='w-full flex flex-col items-center'>
          <Logotipo where='sidebar'/>
        </div>
        
        
        <div className="flex flex-col justify-center items-center gap-5">
          <img className="w-[60px] h-[60px]" src="/images/profile.png" alt="profile" />
          <p>Ally Lecca</p>
        </div>

        <div className="flex flex-col w-full border-t border-orange">
          {mainMenuItems.map((item, index) => (
            <div key={index}>
              <div 
                className={`w-full flex flex-row justify-start items-center gap-2 py-3.5 hover:bg-orange-15 border-b border-orange px-4 bg-gray dark:bg-background cursor-pointer`}
                onClick={item.action || undefined}
              >
                {item.icon}
                {item.text}
                {item.chevron && <span className="ml-auto">{item.chevron}</span>}
              </div>
              
              {item.text === "Solicitudes" && isRequestsOpen && (
                <div className="transition-all duration-300 ease-in-out">
                  {requestsSubMenu.map((subItem, subIndex) => (
                    <div key={subIndex} className='w-full flex flex-row justify-start items-center gap-2 py-3.5 hover:bg-orange-15 dark:bg-black-1 border-b border-orange bg-white-10 px-10'>
                      {subItem.icon}
                      {subItem.text}
                    </div>
                  ))}
                </div>
              )}
              
            </div>
          ))}
          <button
            onClick={handleLogout}
            className={`w-full flex flex-row justify-start items-center gap-2 py-3.5 hover:bg-orange-15 border-b border-orange px-4 bg-gray dark:bg-background cursor-pointer`}
          >
            <TbLogout className={iconClasses}/>
            Cerrar Sesión
          </button>
        </div>         
      </aside>

      <SidebarToggle handleIsOpen={handleIsOpen} />
  </>
  );
};