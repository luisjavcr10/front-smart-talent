export const FormLayout = ({children, handleChange}:Readonly<{children:React.ReactNode, handleChange:(e: React.FormEvent<HTMLFormElement>)=>void}>)=>{
    return(
        <form 
            onSubmit={handleChange}
            className="flex flex-col gap-4">
            {children}
        </form>
    )
}