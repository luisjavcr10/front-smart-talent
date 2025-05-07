export const FormLayout = ({
    children,
    handlelogin
}: Readonly<{
    children: React.ReactNode,
    handlelogin: (e:React.FormEvent<HTMLFormElement>)=>void
    }>)=>{
    return (
    <form onSubmit={handlelogin} className="w-full flex flex-col items-start gap-6">
        {children}
    </form>
    );
}