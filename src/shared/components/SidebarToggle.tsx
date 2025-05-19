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
          top-4 z-40 p-2 left-4
          rounded-xl text-xl bg-main text-white transition-colors 
          cursor-pointer"
        title={`Mostrar sidebar`}
        >
            <GiHamburgerMenu />
        </button>
    )
}