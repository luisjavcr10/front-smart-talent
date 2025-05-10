import ThemeToggle from "../../../shared/components/ThemeToggle"

export const LayoutAuth = ({children}:Readonly<{children: React.ReactNode}>) =>{
    return(
        <main className="bg-gray dark:bg-black-0 flex justify-center items-center h-screen w-full font-bevietnampro font-light">
            {children}
            <ThemeToggle position='left'/>
        </main>
    );
}