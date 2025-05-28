import { useState } from "react";
import { UsersService } from "@/users/service/usersService";
import { FormInput } from "../../shared/FormInput";
import { CreationButton } from "../../shared/CreationButton";
import { Loader } from "@/shared/components/Loader";
import { useNavigate } from "react-router-dom";
import { UsersListResponse } from "@/users/types/UserListResponse";

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

export const FormJuridica = ({userEdit, isUpdate}:Readonly<{userEdit?:UsersListResponse, isUpdate?:boolean}>) => {
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

  const handleCreateUser = async () => {
    const payload = {
      ...user,
      type: "JURIDICA"
    };
    setOpenModal(false);
    setLoading(true);
    const response = await UsersService.createUser(payload);
    setLoading(false);
    navigate('/users');
    console.log(response);
    setOpenModal(false);
  };

  const handleUpdateUser = async () =>{
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
  }

  const handleClick = () =>{
    if(isUpdate){
      handleUpdateUser();
    }else{
      handleCreateUser();
    }
  }

  return (
    <>
    {loading && <Loader />}
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
      <CreationButton handleClick={() => setOpenModal(true)}/>
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
                  <p className="flex-1 border border-white-1 rounded-[5px] px-2 text-end">{user.businessName}</p>
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
                onClick={() =>handleClick()}
                className="text-[14px] font-light bg-main rounded-[5px] px-10 py-1"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
   </> 
  )
}

  