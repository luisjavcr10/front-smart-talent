import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormLayout } from "../../shared/FormLayout";
import { FormInput } from "../../shared/FormInput";
import { FormButton } from "../../shared/FormButton";
import GoogleLogo from "../../../../shared/ui/logos/GoogleLogo";
import { Loader } from "@/shared/components/Loader";
import { useUser } from "@/auth/hooks/useUser";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useUser();

  const clearError = () => {
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setIsLoading(true);
      const state = await login({ email, password });
      if(state){
        setIsLoading(false);
        navigate("/requests");
      }else{
        setIsLoading(false);
        setError("Credenciales inválidas");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <p className="w-full opacity-50 text-[20px]">
        Por favor ingresa tus datos
      </p>

      <FormLayout handlelogin={handleLogin}>
        <FormInput handleError={clearError} error={error} text="Email" type="email" />
        <FormInput handleError={clearError} error={error} text="Contraseña" type="password">
          <Link
            to="/recovery-password"
            className="text-[16px] cursor-pointer hover:text-main"
          >
            <div className="flex justify-between">
              <p>¿Olvidaste tu contraseña?</p>
              {error && <p className="text-error">{error}</p>}
            </div>
          </Link>
        </FormInput>
        <FormButton text="Ingresar" />
      </FormLayout>
      <button
        className="
                    flex justify-center items-center
                    bg-main-3plus dark:bg-black-2 hover:opacity-80
                    border border-white dark:border-main rounded-[15px] 
                    px-4 py-2 
                    w-full 
                    cursor-pointer
                    gap-4"
      >
        <GoogleLogo className="h-[30px] w-[30px]" />
        <p className="text-[20px]">Ingresar con Google</p>
      </button>
    </>
  );
};
