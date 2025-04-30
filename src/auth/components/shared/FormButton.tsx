import { Link } from "react-router-dom";

export const FormButton = ({
    text
}:Readonly<{
    text:string
}>) =>{
    return(
        <Link 
            to="/requests"
            className="
                text-[20px] text-center
                bg-orange 
                hover:opacity-80 
                rounded-[15px] 
                px-4 py-2 
                mt-6 
                w-full 
                cursor-pointer"
        >
            {text}
        </Link>
    );
}