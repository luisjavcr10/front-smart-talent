import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UsersService } from "../service/usersService";
import { UsersList } from "../components/private/list/UsersList";
import { UsersListResponse } from "../types/UserListResponse";
import { motion } from "framer-motion";

export function ListUsersPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersListResponse[]>([]);
  const navigate = useNavigate();

  const handleGetUsers = async () => {
    setLoading(true);
    const response = await UsersService.getUsers();
    console.log(response);
    setUsers(response);
    setLoading(false);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className="flex flex-col mx-5 md:mx-8 my-15 gap-11 font-karla font-light">
      <div className="flex flex-col md:flex-row justify-center md:justify-between">
        <div className="flex flex-col">
          <p className="text-[32px] md:text-[36px] xl:text-[36px]">
            LISTA DE USUARIOS
          </p>
          <p className="text-[14px] font-light">
            Visualiza todos los clientes registrados.
          </p>
        </div>
        <motion.button
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
          className="bg-main-1plus dark:bg-main hover:bg-main dark:hover:bg-main-1plus rounded-sidebar my-5 py-2 px-16 text-[14px] font-light"
          onClick={() => navigate("/users/create")}
        >
          Crear nuevo usuario
        </motion.button>
      </div>
      <div className="w-full h-[500px] p-3 rounded-sidebar shadow-doc-options bg-white dark:bg-black dark:border dark:border-black-1 text-[12px] overflow-x-auto relative">
        {loading ? (
          <div className="w-full text-[14px] font-karla font-light">
            <div
              className="px-2 bg-white-1 dark:bg-black-2
                  text-black dark:text-white font-light text-[14px] rounded-sidebar mb-4"
            >
              <p className="p-2 w-full text-center">
                Cargando lista de empleados...
              </p>
            </div>
          </div>
        ) : (
          <UsersList users={users} />
        )}
      </div>
    </div>
  );
}
