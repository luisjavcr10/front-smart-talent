export const FormLayout = ({
    children
}: Readonly<{
    children: React.ReactNode,
    }>)=>{
    return (
    <form className="w-full flex flex-col items-start gap-6">
        {children}
    </form>
    );
}