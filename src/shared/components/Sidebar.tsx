import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TbFileDollar, TbFileDescription, TbLogout, TbList, TbPlaylistAdd } from "react-icons/tb";
import { SidebarToggle } from './SidebarToggle';
import { Logotipo } from './Logotipo';
import { useUser } from '@/auth/hooks/useUser'
import { MdExpandMore } from "react-icons/md";
import { ThemeSwitch } from './ThemeSwitch';
import { useModalStore } from '@/store/modalStore';

export const Sidebar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setIsActive, isActive } = useModalStore();

  const toggleRequestsMenu = () => {
    setIsRequestsOpen(!isRequestsOpen);
  };

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const mainMenuItems = [
    {
      icon: <TbFileDescription className='w-[30px] h-[30px] text-black-2  dark:text-white-1' />,
      text: "Solicitudes",
      action: toggleRequestsMenu,
      chevron: (
        <div className={`transition-all duration-300 transform ${isRequestsOpen ? 'rotate-180' : 'rotate-0'}`}>
          <MdExpandMore className="w-[25px] h-[25px] text-black-2 dark:text-white-1" />
        </div>
      )
    },
    {
      icon: <TbFileDollar className='w-[30px] h-[30px] text-black-2  dark:text-white-1' />,
      text: "Facturación",
      action: null
    }
  ];

  const requestsSubMenu = [
    { icon: <TbList className="w-[30px] h-[30px] text-black-2  dark:text-white-1" />, text: "Lista de Solicitudes", onclick: () => {} },
    { icon: <TbPlaylistAdd className="w-[30px] h-[30px] text-black-2  dark:text-white-1" />, text: "Agregar Solicitud", onclick: () => {
      setIsActive(true)
    } }
  ];

  return (
    <>
      <aside
        className={`
          fixed xl:relative inset-y-0 left-0 z-40 
          w-96 h-screen
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 max-w-72' : '-translate-x-full xl:translate-x-0 max-w-72'}
          bg-white dark:bg-black
          flex flex-col items-center 
          py-14
          text-black dark:text-white 
          font-karla  
          border-r border-medium  dark:border-black-1 rounded-r-sidebar shadow-sidebar`}
      >
        <div className='w-full flex flex-col items-center mb-5'>
          <Logotipo where='sidebar' />
        </div>


        <div className="flex justify-center items-center gap-4 px-2 py-6 border-t-[1px] border-medium w-full">
          <img className="w-[45px] h-[45px]" src="/images/profile.png" alt="profile" />
          <p className='text-[14px] font-light'>{user?.name}</p>
        </div>

        <div className="flex flex-col w-full border-t border-medium text-[14px] font-light">
          <div
            className={`w-full flex flex-row justify-between items-center gap-2 py-3.5 border-b border-medium px-6`}
          >
            <p>Tema del sistema</p>
            <ThemeSwitch />
          </div>
          {mainMenuItems.map((item, index) => (
            <div key={index}>
              <div
                className={`w-full flex flex-row justify-start items-center gap-2 py-3.5 hover:bg-white-2 dark:hover:bg-black-2 border-b border-medium px-6  cursor-pointer`}
                onClick={item.action || undefined}
              >
                {item.icon}
                {item.text}
                {item.chevron && <span className="ml-auto">{item.chevron}</span>}
              </div>

              {item.text === "Solicitudes" && isRequestsOpen && (
                <div className="transition-all duration-300 ease-in-out">
                  {requestsSubMenu.map((subItem, subIndex) => (
                    <div key={subIndex} onClick={subItem.onclick} className='w-full flex flex-row justify-start items-center gap-2 py-3.5 hover:bg-white dark:hover:bg-black border-b border-medium dark:border-black-1 bg-white-2 dark:bg-black-2 px-10 cursor-pointer'>
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
            className={`w-full flex flex-row justify-start items-center gap-2 py-3.5 hover:bg-white-2 dark:hover:bg-black-2 border-b border-medium px-6  cursor-pointer`}
          >
            <TbLogout className="w-[30px] h-[30px] text-black-2 dark:text-white-1" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <SidebarToggle handleIsOpen={handleIsOpen} />
    </>
  );
};