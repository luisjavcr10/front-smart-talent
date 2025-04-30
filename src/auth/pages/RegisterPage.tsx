import { FormSection } from "../components/shared/FormSection";
import { GreetingSection } from "../components/shared/GreetingSection";
import { RegisterForm } from "../components/private/register/RegisterForm";

export function RegisterPage() {
    return(
        <>
            <GreetingSection 
                href="/login"
                direction="r" 
                greeting="¡BIENVENIDO!" 
                message="¿Ya tienes una cuenta? Ingresa aquí"
            />
            <FormSection direction="r">
                <RegisterForm />
            </FormSection>
        </>
    );
}