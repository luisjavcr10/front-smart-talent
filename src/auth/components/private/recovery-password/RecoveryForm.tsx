import { FormLayout } from "../../shared/FormLayout";
import { FormInput } from "../../shared/FormInput";
import { FormButton } from "../../shared/FormButton";

export const RecoveryForm = () =>{
    return(
        <>
            <p className="w-full opacity-50 text-[20px]">Ingresa el email vinculado a tu usuario</p>

            <FormLayout>
                <FormInput text="Email" type="email"/>
                <FormButton text="Solicitar enlace de recuperación"/>
            </FormLayout>
        </>
    );
}