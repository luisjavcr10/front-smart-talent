import { FormSection } from "../components/shared/FormSection";
import { GreetingSection } from "../components/shared/GreetingSection";
import { ResetForm } from "../components/private/reset-password/ResetForm";

export function ResetPasswordPage(){
    return(
        <>
            <FormSection direction="l">
                <ResetForm />
            </FormSection>
            <GreetingSection
                href="/login"
                direction="l" 
                greeting="¡NO TE PREOCUPES!" 
                message="¿Recordaste tu cuenta? Ingresa aquí"
            />
        </>
    );
}