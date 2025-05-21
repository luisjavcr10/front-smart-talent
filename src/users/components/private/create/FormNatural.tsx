import { useState } from "react";
import { FormInput } from "../../shared/FormInput";
import { CreationButton } from "../../shared/CreationButton";
import { UsersService } from "@/users/service/usersService";
import { UserProps } from "@/users/types/UserListResponse";
import { useNavigate } from "react-router";
import { Loader } from "@/shared/components/Loader";

export const FormNatural = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
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
      type: "NATURAL",
    };
    setLoading(true);
    const response = await UsersService.createUser(payload);
    setLoading(false);
    navigate('/users');
    console.log(response);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-4">
        <FormInput
          fieldName="DNI"
          value={user.documentNumber}
          handleOnChange={(e) =>
            setUser({ ...user, documentNumber: e.target.value })
          }
        />

        <FormInput
          fieldName="Nombres"
          value={user.firstName || ""}
          handleOnChange={(e) =>
            setUser({ ...user, firstName: e.target.value })
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            fieldName="Apellido Paterno"
            value={user.paternalSurname || ""}
            handleOnChange={(e) =>
              setUser({ ...user, paternalSurname: e.target.value })
            }
          />
          <FormInput
            fieldName="Apellido Materno"
            value={user.maternalSurname || ""}
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

        <CreationButton handleClick={() => setOpenModal(true)} />
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
                onClick={() => {
                  handleCreateUser();
                  setOpenModal(false);
                }}
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
