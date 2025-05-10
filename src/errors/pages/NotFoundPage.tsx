import { Link } from "react-router-dom"

export function NotFoundPage() {
    return(
        <main 
            className="
            flex flex-col justify-center items-center
            bg-black-0 
            h-screen w-full 
            text-white">
            <Link to='/'>
            <img src="/images/logo.png" alt="logo" className="w-[300px]"/>
            </Link>
            
            <p className='font-vendura text-[48px] text-center'>Smart Talent</p>
            <p className='font-vendura text-[32px] text-center'>Group</p>
            <p className="font-bebasneue text-[32px] mt-10">404 - PÁGINA NO ENCONTRADA</p>

            <div className="flex flex-row gap-10 mt-8">
                <Link className="bg-white-20 hover:opacity-80 rounded-5xl px-8 py-2" to='..'> Volver atras</Link>
                <Link className="bg-orange hover:opacity-80 rounded-5xl px-8 py-2" to='/'> Ir al inicio</Link>
            </div>
            
        </main>
    )
}