export const FormSection = ({
    children,
    direction,
}:Readonly<{
    children:React.ReactNode,
    direction:string
}>) =>{
    return(
        <div className={`text-black dark:text-white h-screen ${direction==='r'? 'w-11/20':'w-9/20'} flex flex-col justify-center items-center`}>
            <div className="flex flex-col justify-start w-3/5 gap-4">
                {children}
            </div>
        </div>
    );
}