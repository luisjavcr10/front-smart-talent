import { UsersListResponse } from "@/users/types/UserListResponse";
import { useNavigate } from "react-router";

export const UsersList = ({
  users,
}: Readonly<{
  users: UsersListResponse[];
}>) => {
  const navigate = useNavigate();

  const handleEdit = (user:UsersListResponse) => {
    navigate(`/users/edit/${user.id}`, { state: { user } });
  };
  return (
    <div className="w-full text-[14px] font-karla font-light">
      <div className="px-2 grid grid-cols-8 gap-0 bg-main-3plus dark:bg-main-1plus text-black dark:text-white rounded-sidebar mb-4">
        <div className="col-span-1 p-2">Tipo</div>
        <div className="col-span-1 p-2">Nro Doc</div>
        <div className="col-span-2 p-2">Nombre o Razon Social</div>
        <div className="col-span-1 p-2">Telefono</div>
        <div className="col-span-2 p-2">Dirección</div>
        <div className="col-span-1 p-2">Acciones</div>
      </div>
      <div className="text-black dark:text-white flex flex-col gap-2">
        {users.map((request, index) => (
          <div key={index}>
            {/* Main Row */}
            <div className="px-2 grid grid-cols-8 border border-white-1 dark:border-black-1 rounded-sidebar hover:bg-black-05 dark:hover:bg-white-10">
              <div className="col-span-1 p-2 ">
                {request.type}
              </div>
              <div className="col-span-1 p-2 ">
                {request.documentNumber}
              </div>
              <div className="col-span-2 p-2 ">
                {request.type === 'NATURAL' ? `${request.firstName} ${request.paternalSurname} ${request.maternalSurname}` : request.businessName}
              </div>
              <div className="col-span-1 p-2 ">
                {request.phone}
              </div>
              <div className="col-span-2 p-2 ">
                {request.address}
              </div>
              <div className="col-span-1 p-2 ">
                <button onClick={()=>handleEdit(request)} className="cursor-pointer">Editar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
