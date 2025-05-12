import { Link } from 'react-router-dom';
export const Logotipo = ({
    where
}:Readonly<{
    where:string
}>) => {
    return(
        <>
            <Link to='/' className="flex items-center justify-center">
                <img className={`${where==='notfound'?'w-[300px]':'w-3/5'}`} src="/images/logo.png" alt="logo" />
            </Link>
            <p className={`font-vendura ${where=== 'sidebar'? 'text-[20px]':'text-[48px]'}`}>Smart Talent</p>
            <p className={`font-vendura ${where=== 'sidebar'? 'text-[16px]':'text-[32px]'}`}>Group</p>
        </>
    )
}