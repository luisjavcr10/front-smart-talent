import { FormLayout } from "../../shared/FormLayout";
import { FormInput } from "../../shared/FormInput";
import { FormButton } from "../../shared/FormButton";
import GoogleLogo from "../../../../shared/ui/logos/GoogleLogo";

export const RegisterForm = () =>{
    return(
    <>
        <FormLayout>
            <FormInput text="Email" type="email"/>
            <FormInput text="Contraseña" type="password"/>
            <FormInput text="Repetir contraseña" type="password"/>
            <FormButton text="Registrar"/>
        </FormLayout>
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
            <p className="text-[20px]">Registrar con Google</p>
        </button>
    </>)
}