export function ListUsersPage() {
    return(
        <div className="flex flex-col mx-5 md:mx-8 my-15 gap-11 font-karla font-light">
            <div className="flex flex-col md:flex-row justify-center md:justify-between">
                <div className="flex flex-col">
                    <p className="text-[32px] md:text-[36px] xl:text-[36px]">
                    LISTA DE USUARIOS
                    </p>
                    <p className="text-[14px] font-light">
                    Visualiza todos los clientes registrados.
                    </p>
                </div>
                <button>Crear nuevo usuario</button>
            </div>
            

        </div>
    )
}