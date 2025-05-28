import { OptionsModal } from "../components/private/list/OptionsModal";
import { RequestsTable } from "../components/private/list/RequestsTable";
import { motion } from "framer-motion";
import { useModalStore } from "../../shared/store/modalStore";
import { useEffect, useState } from "react";
import { Request, requestsService } from "../services/requestsService";
import { useHasRole, useUser } from "@/auth/hooks/useUser";
import { ROLES } from "@/auth/constants/roles";

export function RequestsListPage() {
  const { isActive, setIsActive } = useModalStore();
  const { user } = useUser();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = useHasRole(ROLES.ADMIN);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await (isAdmin
          ? requestsService.getAllPeople()
          : requestsService.getAllPeopleByEntityId(user?.entityId as number));
        setRequests(data.people);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar las solicitudes, click aqui para recargar.");
        setLoading(false);
      }
    };
    console.log(requests)

    fetchRequests();
  }, []);

  return (
    <div className="flex flex-col mx-5 md:mx-8 my-15 gap-11">
      <div
        className="
                    flex flex-row justify-between items-center
                    w-full mt-5 md:mt-0
                    text-black dark:text-white"
      >
        <div>
          <p className="font-karla text-[32px] md:text-[36px] xl:text-[36px]">
            LISTA DE SOLICITUDES
          </p>
          <p className="text-[12px] font-light">
            Visualiza tus solicitudes, su estado y los informes requeridos.
          </p>
        </div>

        {user?.roles.includes(ROLES.USER) && (
          <motion.button
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-main-1plus dark:bg-main hover:bg-main dark:hover:bg-main-1plus rounded-sidebar py-2 px-8 text-[14px] font-light"
            onClick={() => setIsActive(true)}
          >
            Agregar nueva solicitud
          </motion.button>
        )}
      </div>

      <div className="w-full h-[500px] p-3 rounded-sidebar shadow-doc-options bg-white dark:bg-black dark:border dark:border-black-1 text-[12px] overflow-x-auto relative">
        {loading ? (
          <div
            className="
                    px-4 py-2 mb-4
                    bg-white-1 dark:bg-black-2
                  text-black dark:text-white font-light text-[14px]
                    rounded-sidebar 
                    text-center
                "
          >
            Cargando solicitudes...
          </div>
        ) : error ? (
          <motion.button
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setError(null);
              location.reload();
            }}
            className="
                        w-full
                        px-4 py-2 mb-4
                        bg-error hover:bg-error-1
                      text-white font-light text-[14px]
                        rounded-sidebar 
                        text-center
                    "
          >
            {error}
          </motion.button>
        ) : (
          <RequestsTable data={requests} isAdmin={isAdmin} />
        )}
        <OptionsModal
          isActive={isActive}
          handleActive={() => setIsActive(!isActive)}
        />
      </div>
    </div>
  );
}
