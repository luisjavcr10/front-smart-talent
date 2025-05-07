import { Link } from 'react-router-dom';
import { FormLayout } from "../../shared/FormLayout";
import { FormInput } from "../../shared/FormInput";
import { FormButton } from "../../shared/FormButton";
import GoogleLogo from "../../../../shared/ui/logos/GoogleLogo";

export const LoginForm = () =>{

    return(
        <>
            <p className="w-full opacity-50 text-[20px]">Por favor ingresa tus datos</p>

            <FormLayout>
                <FormInput text="Email" type="email"/>
                <FormInput text="Contraseña" type="password">
                <Link 
                    to="/recovery-password" 
                    className="text-[16px] cursor-pointer hover:text-orange"
                    >
                    ¿Olvidaste tu contraseña?
                </Link>
                </FormInput>
                <FormButton text="Ingresar"/>
            </FormLayout>
            <button 
                className="
                    flex justify-center items-center
                    bg-orange-15 dark:bg-white-20 hover:opacity-80
                    border border-white dark:border-orange rounded-[15px] 
                    px-4 py-2 
                    w-full 
                    cursor-pointer
                    gap-4">
                <GoogleLogo className="h-[30px] w-[30px]"/>
                <p className="text-[20px]">Ingresar con Google</p>
            </button>
        </>
    );
}