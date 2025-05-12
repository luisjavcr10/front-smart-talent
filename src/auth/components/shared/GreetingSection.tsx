import { Link } from 'react-router-dom';
import { Logotipo } from '@/shared/components/Logotipo';

export const GreetingSection = ({
    greeting,
    message,
    direction,
    href
}:Readonly<{
    greeting:string,
    message?:string,
    direction:string,
    href:string
}>) =>{

    return(
        <div 
            className={`
                bg-white dark:bg-black-1 
                text-black dark:text-white 
                h-screen 
                ${direction==='r'? 'w-9/20':'w-11/20'} 
                flex flex-col justify-center items-center 
                ${direction==='r'?'border-r-[5px] border-r-orange rounded-r-5xl': 'border-l-[5px] border-l-orange rounded-l-5xl'}
                `}
        >
            <Logotipo where='greeting'/>
            <h1 className="mt-20 text-[48px] font-bebasneue font-normal text-center">{greeting}</h1>
            <Link 
                to={href}
                className="text-[16px] cursor-pointer hover:text-orange opacity-80"
            >
                {message}
            </Link>
        </div>
    )
}