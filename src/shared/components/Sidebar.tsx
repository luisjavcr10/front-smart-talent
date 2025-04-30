import { TbFileDollar, TbFileDescription, TbLogout } from "react-icons/tb";

export const Sidebar = () =>{
    return(
        <div className="fixed left-0 top-0 h-screen w-80 bg-black-1 flex flex-col items-center py-10 gap-14 text-white font-bevietnampro">
            <img className="w-3/5" src="/images/logo-black.png" alt="logo" />
            <div className="flex flex-col justify-center items-center gap-5">
                <img className="w-[60px] h-[60px]" src="/images/profile.png" alt="profile" />
                <p>Ally Lecca</p>
            </div>

            <div className="flex flex-col w-full border-t border-orange">
                <div className="w-full flex flex-row justify-start items-center gap-2 bg-background hover:bg-black-1 py-3.5 px-4 border-b border-orange">
                    <TbFileDescription className="w-[30px] h-[30px]" />
                    Solicitudes
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-2 bg-background hover:bg-black-1 py-3.5 px-4 border-b border-orange">
                    <TbFileDollar className="w-[30px] h-[30px]"  />
                    Facturación
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-2 bg-background hover:bg-black-1 py-3.5 px-4 border-b border-orange">
                    <TbLogout className="w-[30px] h-[30px]"  />
                    Cerrar Sesión
                </div>
            </div>         
        </div>
    )
}
