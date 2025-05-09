import { FormButton } from "../../shared/FormButton";
import { FormInput } from "../../shared/FormInput";
import { FormLayout } from "../../shared/FormLayout";

export const ResetForm = () => {
    const handleSubmit = () =>{
        console.log('send')
    }

    return(
        <>
            <p className="w-full opacity-50 text-[20px]">Ingresa tu nueva contraseña</p>

            <FormLayout handlelogin={handleSubmit}>
                <FormInput text="Nueva contraseña" type="password"/>
                <FormInput text="Confirmar nueva contraseña" type="password"/>
                <FormButton text="Restablecer contraseña"/>
            </FormLayout>
        </>
    );
}