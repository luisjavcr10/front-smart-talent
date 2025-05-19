export const FormInput = ({
    children,
    text,
    type,
    error,
    handleError
}: Readonly<{
    children?: React.ReactNode,
    text: string,
    type: string,
    error:string | null,
    handleError: () => void
    }>) =>{
    return(
        <div className="flex flex-col w-full gap-4">
            <label className="text-[20px]">{text}</label>
            <input type={type} name={type} onChange={handleError} className={`bg-white-1 dark:bg-black-2 rounded-[15px] h-10 px-4 py-2 ${error?'border-2 border-error':'outline-main '}`} />
            {children}
        </div>
    )
}