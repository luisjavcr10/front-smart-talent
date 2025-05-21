export const FormSection = ({
    children,
}:Readonly<{
    children:React.ReactNode
}>) =>{
    return(
        <div 
            className="
                text-black dark:text-white 
                h-screen 
                flex-1 flex flex-col justify-center items-center
                p-8 md:p-28
                ">
                {children}
        </div>
    );
}