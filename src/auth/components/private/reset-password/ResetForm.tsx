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
                <FormInput error={'error'} handleError={()=>console.log('add a method')} text="Nueva contraseña" type="password"/>
                <FormInput error={'error'} handleError={()=>console.log('add a method')} text="Confirmar nueva contraseña" type="password"/>
                <FormButton text="Restablecer contraseña"/>
            </FormLayout>
        </>
    );
}