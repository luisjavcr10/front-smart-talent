import { useState } from "react";
import { FormInput } from "../../shared/FormInput";
import { CreationButton } from "../../shared/CreationButton";
import { UsersService } from "@/users/service/usersService";
import { UserProps } from "@/users/types/UserListResponse";
import { useNavigate } from "react-router";
import { Loader } from "@/shared/components/Loader";
import { UsersListResponse } from "@/users/types/UserListResponse";

interface FormErrors {
  documentNumber: { error: boolean; message: string };
  firstName: { error: boolean; message: string };
  paternalSurname: { error: boolean; message: string };
  maternalSurname: { error: boolean; message: string };
  email: { error: boolean; message: string };
  address: { error: boolean; message: string };
  phone: { error: boolean; message: string };
}

export const FormNatural = ({userEdit, isUpdate}:Readonly<{userEdit?:UsersListResponse, isUpdate?:boolean}>) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<UserProps>({
    documentNumber: userEdit?.documentNumber || '',
    firstName: userEdit?.firstName || '',
    paternalSurname: userEdit?.paternalSurname || '',
    maternalSurname: userEdit?.maternalSurname || '',
    email:userEdit?.user.email || '',
    address:userEdit?.address || '',
    phone: userEdit?.phone || '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    documentNumber: { error: false, message: '' },
    firstName: { error: false, message: '' },
    paternalSurname: { error: false, message: '' },
    maternalSurname: { error: false, message: '' },
    email: { error: false, message: '' },
    address: { error: false, message: '' },
    phone: { error: false, message: '' },
  });

  // Validación para DNI (8 dígitos)
  const validateDocumentNumber = (value: string) => {
    const isValid = /^\d{8}$/.test(value);
    setErrors(prev => ({
      ...prev,
      documentNumber: {
        error: !isValid,
        message: isValid ? '' : 'El DNI debe tener 8 dígitos numéricos'
      }
    }));
    return isValid;
  };

  // Validación para nombres y apellidos (solo letras y espacios)
  const validateName = (value: string, field: keyof FormErrors) => {
    const isValid = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
    setErrors(prev => ({
      ...prev,
      [field]: {
        error: !isValid && value.length > 0,
        message: isValid ? '' : 'Solo se permiten letras y espacios'
      }
    }));
    return isValid;
  };

  // Validación para email
  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setErrors(prev => ({
      ...prev,
      email: {
        error: !isValid && value.length > 0,
        message: isValid ? '' : 'Formato de correo electrónico inválido'
      }
    }));
    return isValid;
  };

  // Validación para teléfono (9 dígitos)
  const validatePhone = (value: string) => {
    const isValid = /^\d{9}$/.test(value);
    setErrors(prev => ({
      ...prev,
      phone: {
        error: !isValid && value.length > 0,
        message: isValid ? '' : 'El teléfono debe tener 9 dígitos numéricos'
      }
    }));
    return isValid;
  };

  // Validación para dirección (no vacía)
  const validateAddress = (value: string) => {
    const isValid = value.trim().length > 0;
    setErrors(prev => ({
      ...prev,
      address: {
        error: !isValid && value.length > 0,
        message: isValid ? '' : 'La dirección no puede estar vacía'
      }
    }));
    return isValid;
  };

  const validateForm = () => {
    const isDocumentValid = validateDocumentNumber(user.documentNumber);
    const isFirstNameValid = validateName(user.firstName || '', 'firstName');
    const isPaternalSurnameValid = validateName(user.paternalSurname || '', 'paternalSurname');
    const isMaternalSurnameValid = validateName(user.maternalSurname || '', 'maternalSurname');
    const isEmailValid = validateEmail(user.email);
    const isAddressValid = validateAddress(user.address);
    const isPhoneValid = validatePhone(user.phone);

    return isDocumentValid && isFirstNameValid && isPaternalSurnameValid && 
           isMaternalSurnameValid && isEmailValid && isAddressValid && isPhoneValid;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) {
      return;
    }
    
    const payload = {
      ...user,
      type: "NATURAL",
    };
    setOpenModal(false);
    setLoading(true);
    const response = await UsersService.createUser(payload);
    setLoading(false);
    navigate('/users');
    console.log(response);
  };

  const hanldeUpdateUser = async () => {
    if (!validateForm()) {
      return;
    }
    
    const payload = {
      ...user,
      type: userEdit?.type,
    };
    setOpenModal(false);
    setLoading(true);
    const response = await UsersService.updateUser(userEdit?.id || 0, payload);
    setLoading(false);
    navigate('/users');
    console.log(response);
  };

  const handleButtonToConfirm = () => {
    if(isUpdate){
      hanldeUpdateUser();
    }else{
      handleCreateUser();
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-4">
        <FormInput
          fieldName="DNI"
          value={user.documentNumber}
          handleOnChange={(e) => {
            const value = e.target.value;
            setUser({ ...user, documentNumber: value });
            validateDocumentNumber(value);
          }}
          error={errors.documentNumber.error}
          errorMessage={errors.documentNumber.message}
        />

        <FormInput
          fieldName="Nombres"
          value={user.firstName || ""}
          handleOnChange={(e) => {
            const value = e.target.value;
            setUser({ ...user, firstName: value });
            validateName(value, 'firstName');
          }}
          error={errors.firstName.error}
          errorMessage={errors.firstName.message}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            fieldName="Apellido Paterno"
            value={user.paternalSurname || ""}
            handleOnChange={(e) => {
              const value = e.target.value;
              setUser({ ...user, paternalSurname: value });
              validateName(value, 'paternalSurname');
            }}
            error={errors.paternalSurname.error}
            errorMessage={errors.paternalSurname.message}
          />
          <FormInput
            fieldName="Apellido Materno"
            value={user.maternalSurname || ""}
            handleOnChange={(e) => {
              const value = e.target.value;
              setUser({ ...user, maternalSurname: value });
              validateName(value, 'maternalSurname');
            }}
            error={errors.maternalSurname.error}
            errorMessage={errors.maternalSurname.message}
          />
        </div>

        <FormInput
          fieldName="Dirección"
          value={user.address}
          handleOnChange={(e) => {
            const value = e.target.value;
            setUser({ ...user, address: value });
            validateAddress(value);
          }}
          error={errors.address.error}
          errorMessage={errors.address.message}
        />
        <FormInput
          fieldName="Teléfono"
          value={user.phone}
          handleOnChange={(e) => {
            const value = e.target.value;
            setUser({ ...user, phone: value });
            validatePhone(value);
          }}
          error={errors.phone.error}
          errorMessage={errors.phone.message}
        />

        <FormInput
          fieldName="Correo"
          value={user.email}
          handleOnChange={(e) => {
            const value = e.target.value;
            setUser({ ...user, email: value });
            validateEmail(value);
          }}
          error={errors.email.error}
          errorMessage={errors.email.message}
        />

        <CreationButton handleClick={() => {
          if (validateForm()) {
            setOpenModal(true);
          }
        }} />
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-black-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col gap-5">
            <h3 className="text-[16px] pb-1 border-b border-white-1">
              Detalles del nuevo cliente
            </h3>
            <div className="w-full flex flex-col gap-2">
                <div className="flex">
                  <p className="min-w-[120px]">DNI</p>
                  <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.documentNumber}</p>
                </div>
                <div className="flex">
                  <p className="min-w-[120px]">Nombres</p>
                  <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.firstName}</p>
                </div>
                <div className="flex">
                  <p className="min-w-[120px]">Ap. Paterno</p>
                  <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.paternalSurname}</p>
                </div>
                <div className="flex">
                  <p className="min-w-[120px]">Ap. Materno</p>
                  <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.maternalSurname}</p>
                </div>
                <div className="flex">
                  <p className="min-w-[120px]">Dirección</p>
                  <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.address}</p>
                </div>
                <div className="flex">
                  <p className="min-w-[120px]">Telefono</p>
                  <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.phone}</p>
                </div>
                <div className="flex">
                  <p className="min-w-[120px]">Correo</p>
                  <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.email}</p>
                </div>
            </div>
            <div className="flex justify-around">
              <button
                onClick={() => setOpenModal(false)}
                className="text-[14px] font-light border border-white-1 rounded-[5px] px-10 py-1"
              >
                Regresar
              </button>
              <button
                onClick={() => {handleButtonToConfirm()}}
                className="text-[14px] font-light bg-main rounded-[5px] px-10 py-1"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
