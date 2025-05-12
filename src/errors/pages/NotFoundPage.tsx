import { Link, useNavigate } from "react-router-dom"
import ThemeToggle from "../../shared/components/ThemeToggle";
import { Logotipo } from "@/shared/components/Logotipo";

export function NotFoundPage() {
    const navigate = useNavigate();
    return(
        <>
            <main 
                className="
                flex flex-col justify-center items-center
                bg-white dark:bg-black-0 
                h-screen w-full 
                text-black dark:text-white">
                <Logotipo where='notfound'/>

                <div className="flex flex-row gap-10 mt-8">
                    <button onClick={() => navigate(-1)} className=" bg-orange-15 dark:bg-white-20 hover:opacity-80 border border-orange dark:border-0 rounded-[15px]  px-8 py-2" > Volver atras</button>
                    <Link className="bg-orange hover:opacity-80 rounded-[15px] px-8 py-2" to='/'> Ir al inicio</Link>
                </div>
                
            </main>
            <ThemeToggle position='left'/>
        </>
        
    )
}