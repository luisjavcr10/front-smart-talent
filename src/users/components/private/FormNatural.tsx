import { useState } from "react";
import { FormLayout } from "../shared/FormLayout";
import { FormInput } from "../shared/FormInput";
import { CreationButton } from "../shared/CreationButton";

interface NaturalUserProps {
  DNI: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  address: string;
  phone: string;
}

export const FormNatural = () => {
  const [user, setUser] = useState<NaturalUserProps>({
    DNI: "",
    name: "",
    paternalSurname: "",
    maternalSurname: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleCreateUser = async () => {
    const payload = {
      documentNumber: user.DNI,
      name: user.name,
      paternalSurname: user.paternalSurname,
      maternalSurname: user.maternalSurname,
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
        fieldName="DNI"
        value={user.DNI}
        handleOnChange={(e) => setUser({ ...user, DNI: e.target.value })}
      />

      <FormInput
        fieldName="Nombres"
        value={user.name}
        handleOnChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          fieldName="Apellido Paterno"
          value={user.name}
          handleOnChange={(e) =>
            setUser({ ...user, paternalSurname: e.target.value })
          }
        />
        <FormInput
          fieldName="Apellido Materno"
          value={user.name}
          handleOnChange={(e) =>
            setUser({ ...user, maternalSurname: e.target.value })
          }
        />
      </div>

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
  );
};
