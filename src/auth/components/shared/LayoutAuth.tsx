import ThemeToggle from "../../../shared/components/ThemeToggle"

export const LayoutAuth = ({children}:Readonly<{children: React.ReactNode}>) =>{
    return(
        <main className="bg-white dark:bg-black flex justify-center items-center h-screen w-full font-karla font-light">
            {children}
            <ThemeToggle position='left'/>
        </main>
    );
}