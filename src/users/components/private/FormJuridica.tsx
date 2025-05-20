import { useState } from "react";
import { FormLayout } from "../shared/FormLayout";
import { FormInput } from "../shared/FormInput";
import { CreationButton } from "../shared/CreationButton";

interface JuridicaUserProps {
    RUC: string;
    businessName: string;
    email: string;
    address: string;
    phone: string;
  }

export const FormJuridica = () => {
  const [user, setUser] = useState<JuridicaUserProps>({
    RUC: "",
    businessName: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleCreateUser = async () => {
    const payload = {
      documentNumber: user.RUC,
      businessName: user.businessName,
      email: user.email,
      address: user.address,
      phone: user.phone,
      type: "JURIDICO"
    };
    try {
      const response = await fetch("https://smart-talent-api-k6yj.onrender.com/api/entities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzQ3Nzc3NzE3LCJleHAiOjE3NDc4NjQxMTd9.1_aUgpkOUwj2oSGtjnq6dQ4lGBUj8U-0rzddsY0tP2Y"
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log("Respuesta del API:", data);
    } catch (error) {
      console.error("Error al crear usuario jurídico:", error);
    }
  };

  return (
    <FormLayout handleChange={handleCreateUser}>
        <FormInput
        fieldName="RUC"
        value={user.RUC}
        handleOnChange={(e) => setUser({ ...user, RUC: e.target.value })}
        />
        <FormInput
        fieldName="Razón social"
        value={user.RUC}
        handleOnChange={(e) => setUser({ ...user, businessName: e.target.value })}
        />
        <FormInput
        fieldName="Dirección"
        value={user.address}
        handleOnChange={(e) => setUser({ ...user, address: e.target.value })}
      />
      <FormInput
        fieldName="Teléfono"
        value={user.phone}
        handleOnChange={(e) => setUser({ ...user, phone: e.target.value })}
      />

      <FormInput
        fieldName="Correo"
        value={user.email}
        handleOnChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <CreationButton />
    </FormLayout>
  )
}

  