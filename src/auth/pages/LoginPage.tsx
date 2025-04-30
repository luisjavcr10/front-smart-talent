import GoogleLogo from "../../shared/ui/logos/GoogleLogo";

export function LoginPage() {
    return (
      <main className="bg-black-0 flex justify-center items-center h-screen w-full font-display">
        <div className="bg-black-1 text-white h-screen w-full flex flex-col justify-center items-center border-r-[5px] border-r-orange rounded-r-5xl">
            <img src="/logo-black.png" alt="logo" className="mb-10"/>
            <h1 className="text-[48px]">HOLA DE NUEVO!!</h1>
            <p className="text-[16px] cursor-pointer">Aun no estas registrado?</p>
        </div>
         <div className="text-white h-screen w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-start w-3/5 gap-4">
                <p className="w-full opacity-50 text-[20px]">Por favor ingresa tus datos</p>
                <form className="w-full flex flex-col items-start gap-6">
                    <div className="flex flex-col w-full gap-4">
                        <label className="text-[20px]">Email</label>
                        <input type="email" className="bg-white-20 rounded-[15px] h-10 px-4 py-2" />
                    </div>
                    <div className="flex flex-col w-full gap-4">
                        <label className="text-[20px]">Contraseña</label>
                        <input type="password" className="bg-white-20 rounded-[15px] h-10 px-4 py-2" />
                    </div>
                    <a className="opacity-50 text-[16px] cursor-pointer">Olvidaste tu contraseña?</a>
                    <button className="bg-orange hover:opacity-80 rounded-[15px] px-4 py-2 w-full mt-6 cursor-pointer text-[24px]">Ingresar</button>
                </form>
                <button 
                    className="
                        flex justify-center items-center
                        bg-white-20 hover:opacity-80
                        border border-orange rounded-[15px] 
                        px-4 py-2 
                        w-full 
                        cursor-pointer
                        gap-4">
                    <GoogleLogo className="h-[30px] w-[30px]"/>
                    <p className="text-[24px]">Ingresar con Google</p>
                </button>
            </div>
        </div>
      </main>
    );
}