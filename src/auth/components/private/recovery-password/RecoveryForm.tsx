import { FormLayout } from "../../shared/FormLayout";
import { FormInput } from "../../shared/FormInput";
import { FormButton } from "../../shared/FormButton";

export const RecoveryForm = () =>{
    const handleSubmit = () =>{
        console.log('send')
    }

    return(
        <>
            <p className="w-full opacity-50 text-[20px]">Si eres administrador, ingresa el email asociado.</p>

            <FormLayout handlelogin={handleSubmit}>
                <FormInput text="Email" type="email"/>
                <FormButton text="Solicitar enlace de recuperación"/>
            </FormLayout>
        </>
    );
}