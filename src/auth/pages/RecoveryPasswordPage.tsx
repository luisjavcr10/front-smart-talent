import { FormSection } from "../components/shared/FormSection"
import { GreetingSection } from "../components/shared/GreetingSection"
import { RecoveryForm } from "../components/private/recovery-password/RecoveryForm"

export function RecoveryPasswordPage(){
    return(
        <>
            <FormSection>
                <RecoveryForm/>
            </FormSection>
            
            <GreetingSection 
                href="/login" 
                direction="l" 
                greeting="¡NO TE PREOCUPES!" 
                message="¿Recordaste tu cuenta? Ingresa aquí"
            />
        </>
    )
}