import { useState } from "react";
import { UsersService } from "@/users/service/usersService";
import { FormInput } from "../../shared/FormInput";
import { CreationButton } from "../../shared/CreationButton";
import { Loader } from "@/shared/components/Loader";
import { useNavigate } from "react-router-dom";
import { UsersListResponse } from "@/users/types/UserListResponse";

interface UserProps {
  documentNumber: string;
  businessName?: string;
  email: string;
  address: string;
  phone: string;
}

interface FormErrors {
  documentNumber: { error: boolean; message: string };
  businessName: { error: boolean; message: string };
  email: { error: boolean; message: string };
  address: { error: boolean; message: string };
  phone: { error: boolean; message: string };
}

export const FormJuridica = ({ userEdit, isUpdate }: Readonly<{ userEdit?: UsersListResponse, isUpdate?: boolean }>) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [user, setUser] = useState<UserProps>({
    documentNumber: userEdit?.documentNumber || "",
    businessName: userEdit?.businessName || "",
    email: userEdit?.user.email || "",
    address: userEdit?.address || "",
    phone: userEdit?.phone || "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    documentNumber: { error: false, message: '' },
    businessName: { error: false, message: '' },
    email: { error: false, message: '' },
    address: { error: false, message: '' },
    phone: { error: false, message: '' },
  });

  const validateRUC = (value: string) => {
    const isValid = /^\d{11}$/.test(value);
    setErrors(prev => ({
      ...prev,
      documentNumber: {
        error: !isValid,
        message: isValid ? '' : 'El RUC debe tener 11 dígitos numéricos'
      }
    }));
    return isValid;
  };

  const validateBusinessName = (value: string) => {
    const isValid = value.trim().length > 0;
    setErrors(prev => ({
      ...prev,
      businessName: {
        error: !isValid,
        message: isValid ? '' : 'La razón social no puede estar vacía'
      }
    }));
    return isValid;
  };

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

  const validateForm = () => {
    const isDocumentValid = validateRUC(user.documentNumber);
    const isBusinessNameValid = validateBusinessName(user.businessName || '');
    const isEmailValid = validateEmail(user.email);
    const isAddressValid = validateAddress(user.address);
    const isPhoneValid = validatePhone(user.phone);

    return isDocumentValid && isBusinessNameValid && isEmailValid && isAddressValid && isPhoneValid;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;
    const payload = { ...user, type: "JURIDICA" };
    setOpenModal(false);
    setLoading(true);
    const response = await UsersService.createUser(payload);
    setLoading(false);
    navigate('/users');
    console.log(response);
  };

  const handleUpdateUser = async () => {
    if (!validateForm()) return;
    const payload = { ...user, type: userEdit?.type };
    setOpenModal(false);
    setLoading(true);
    const response = await UsersService.updateUser(userEdit?.id || 0, payload);
    setLoading(false);
    navigate('/users');
    console.log(response);
  };

  const handleClick = () => {
    if (validateForm()) setOpenModal(true);
  };

  const handleConfirm = () => {
    if (isUpdate) {
      handleUpdateUser();
    } else {
      handleCreateUser();
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-4">
        <FormInput
          fieldName="RUC"
          value={user.documentNumber}
          handleOnChange={(e) => {
            const value = e.target.value;
            setUser({ ...user, documentNumber: value });
            validateRUC(value);
          }}
          error={errors.documentNumber.error}
          errorMessage={errors.documentNumber.message}
        />
        <FormInput
          fieldName="Razón social"
          value={user.businessName || ''}
          handleOnChange={(e) => {
            const value = e.target.value;
            setUser({ ...user, businessName: value });
            validateBusinessName(value);
          }}
          error={errors.businessName.error}
          errorMessage={errors.businessName.message}
        />
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
        <CreationButton handleClick={handleClick} />
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col gap-5">
            <h3 className="text-[16px] pb-1 border-b border-white-1">
              Detalles del nuevo cliente
            </h3>
            <div className="w-full flex flex-col gap-2">
              <div className="flex">
                <p className="min-w-[120px]">RUC</p>
                <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.documentNumber}</p>
              </div>
              <div className="flex">
                <p className="min-w-[120px]">Razón social</p>
                <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.businessName}</p>
              </div>
              <div className="flex">
                <p className="min-w-[120px]">Dirección</p>
                <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.address}</p>
              </div>
              <div className="flex">
                <p className="min-w-[120px]">Teléfono</p>
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
                onClick={handleConfirm}
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
