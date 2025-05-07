import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../../services/authService';
import { FormLayout } from "../../shared/FormLayout";
import { FormInput } from "../../shared/FormInput";
import { FormButton } from "../../shared/FormButton";
import GoogleLogo from "../../../../shared/ui/logos/GoogleLogo";

export const LoginForm = () =>{
    const navigate = useNavigate();

        const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
        
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            try {
                await AuthService.login(email,password);
                console.log('hola');
                navigate('/requests');
            } catch (error) {
                console.error(error);
            }
        };


    return(
        <>
            <p className="w-full opacity-50 text-[20px]">Por favor ingresa tus datos</p>

            <FormLayout handlelogin={handleLogin}>
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