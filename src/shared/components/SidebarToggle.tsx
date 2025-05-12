import { GiHamburgerMenu } from "react-icons/gi";

export const SidebarToggle = ({
    handleIsOpen
}:Readonly<{
    handleIsOpen:()=>void
}>) => {
    return(
        <button
        onClick={handleIsOpen}
        className="
          xl:hidden 
          fixed 
          top-4 z-50 p-2 left-4
          rounded-xl text-xl bg-orange text-white dark:bg-orange-50 transition-colors 
          cursor-pointer"
        title={`Mostrar sidebar`}
        >
            <GiHamburgerMenu />
        </button>
    )
}