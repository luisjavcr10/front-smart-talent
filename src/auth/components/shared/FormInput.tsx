export const FormInput = ({
    children,
    text,
    type
}: Readonly<{
    children?: React.ReactNode,
    text: string,
    type: string
    }>) =>{
    return(
        <div className="flex flex-col w-full gap-4">
            <label className="text-[20px]">{text}</label>
            <input type={type} name={type} className="bg-black-05 dark:bg-white-20 rounded-[15px] h-10 px-4 py-2 outline-orange" />
            {children}
        </div>
    )
}