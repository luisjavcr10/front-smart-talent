export const FormLayout = ({children, handleChange}:Readonly<{children:React.ReactNode, handleChange:()=>void}>)=>{
    return(
        <form 
            onSubmit={handleChange}
            className="flex flex-col gap-4">
            {children}
        </form>
    )
}