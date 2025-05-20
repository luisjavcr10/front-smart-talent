import { useState } from "react";
import { UsersService } from "@/users/service/usersService";
import { FormInput } from "../shared/FormInput";
import { CreationButton } from "../shared/CreationButton";

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

export const FormJuridica = () => {
  const [user, setUser] = useState<UserProps>({
    documentNumber: "",
    businessName: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleCreateUser = async () => {
    const payload = {
      ...user,
      type: "JURIDICA"
    };
    const response = await UsersService.createUser(payload);
    console.log(response);

  };

  return (
    <div className="flex flex-col gap-4">
        <FormInput
        fieldName="RUC"
        value={user.documentNumber}
        handleOnChange={(e) => setUser({ ...user, documentNumber: e.target.value })}
        />
        <FormInput
        fieldName="Razón social"
        value={user.businessName || ''}
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
      <CreationButton handleClick={handleCreateUser}/>
    </div>
  )
}

  