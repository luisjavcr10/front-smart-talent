
export const FormButton = ({
    text
}:Readonly<{
    text:string
}>) =>{
    return(
        <button 
            type="submit"
            className="
                text-[20px] text-center
                bg-main 
                hover:opacity-80 
                rounded-[15px] 
                px-4 py-2 
                mt-6 
                w-full 
                cursor-pointer"
        >
            {text}
        </button>
    );
}