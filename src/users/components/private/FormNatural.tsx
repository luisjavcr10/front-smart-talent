import { useState } from "react";
import { FormLayout } from "../shared/FormLayout";
import { FormInput } from "../shared/FormInput";
import { CreationButton } from "../shared/CreationButton";
import { UsersService } from "@/users/service/usersService";

interface UserProps {
  documentNumber: string;
  firstName?: string;
  paternalSurname?: string;
  maternalSurname?: string;
  businessName?: string;
  email: string;
  address: string;
  phone: string;
}

export const FormNatural = () => {
  const [user, setUser] = useState<UserProps>({
    documentNumber: "",
    firstName: "",
    paternalSurname: "",
    maternalSurname: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleCreateUser = async () => {
    const payload = {
      ...user,
      type: "NATURAL"
    };
    const response = await UsersService.createUser(payload);
    console.log(response);

  };



  return (
    <div className="flex flex-col gap-4">
      <FormInput
        fieldName="DNI"
        value={user.documentNumber}
        handleOnChange={(e) => setUser({ ...user, documentNumber: e.target.value })}
      />

      <FormInput
        fieldName="Nombres"
        value={user.firstName || ''}
        handleOnChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          fieldName="Apellido Paterno"
          value={user.paternalSurname || ''}
          handleOnChange={(e) =>
            setUser({ ...user, paternalSurname: e.target.value })
          }
        />
        <FormInput
          fieldName="Apellido Materno"
          value={user.maternalSurname || ''}
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

      <CreationButton handleClick={handleCreateUser}/>
    </div>
  );
};
