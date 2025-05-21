import { useState } from "react";
import { UserTypeButton } from "../components/private/UserTypeButton";
import { FormNatural } from "../components/private/FormNatural";
import { FormJuridica } from "../components/private/FormJuridica";

export function CreateUserPage() {
  const [userType, setUserType] = useState<"Natural" | "Jurídica">("Natural");

  return (
    <div className="flex flex-col mx-5 md:mx-8 my-15 gap-11 font-karla font-light">
      <div>
        <p className="text-[32px] md:text-[36px] xl:text-[36px]">
          CREACIÓN DE USUARIOS
        </p>
        <p className="text-[14px] font-light">
          Añade clientes y completa sus datos personales o empresariales.
        </p>
      </div>

      <div className="flex gap-6">
        <UserTypeButton
          expectedType="Natural"
          userType={userType}
          hanldeUserType={() => setUserType("Natural")}
        />
        <UserTypeButton
          expectedType="Jurídica"
          userType={userType}
          hanldeUserType={() => setUserType("Jurídica")}
        />
      </div>

      <p className="text-[14px]">
        Ingresa los datos en los campos correspondientes:
      </p>

      {userType === "Natural" ? (
        <FormNatural />
      ) : (
        <FormJuridica />
      )}
    </div>
  );
}
