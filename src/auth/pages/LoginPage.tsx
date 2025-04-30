import { LoginForm } from "../components/private/login/LoginForm";
import { FormSection } from "../components/shared/FormSection";
import { GreetingSection } from "../components/shared/GreetingSection";

export function LoginPage() {
    return (
      <>
        <GreetingSection 
            href="/register"
            direction="r" 
            greeting="¡HOLA DE NUEVO!" 
            message="¿Aún no tienes cuenta? Registrate aquí"/>

         <FormSection direction="r">
                <LoginForm/>
        </FormSection>
      </>
    );
}