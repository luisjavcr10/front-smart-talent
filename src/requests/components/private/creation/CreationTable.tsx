import { DocsChecklist } from "./DocsChecklist";
import { RequestsType } from "@/requests/types/RequestsListType";  
import { motion } from "framer-motion";
import { GoPlus } from "react-icons/go";

export const CreationTable = ({
    requests,
    openIndex,
    handleRequests,
    toggleOpenOptions,
    handleOpenOptionsIndex,
    handleDocCheckbox
}:Readonly<{
    requests:RequestsType[],
    openIndex:number | null,
    handleRequests:(newRequests:RequestsType[])=>void,
    toggleOpenOptions:(rowIndex: number)=>void,
    handleOpenOptionsIndex: () => void,
    handleDocCheckbox:(rowIndex: number, docName: string, checked: boolean)=>void,
}>) =>{
    const addRow = () => {
        handleRequests([
          ...requests,
          {
            dni: "",
            fullname: "",
            phone: "",
            docs: [],
          },
        ]);
    };

    return(
        <div className="w-full h-[550px] bg-white-100 dark:bg-white-10 shadow-doc-options text-[12px] overflow-x-auto relative">
        <table className="w-full min-w-[800px]">
          <thead className="bg-cream dark:bg-black-0 text-black dark:text-white">
            <tr>
              <th className="text-start p-2 border border-border dark:border-shadow-dark">
                
              </th>
              <th className="text-start p-2 border border-border dark:border-shadow-dark">
                DNI
              </th>
              <th className="text-start p-2 border border-border dark:border-shadow-dark">
                Nombres completos
              </th>
              <th className="text-start p-2 border border-border dark:border-shadow-dark">
                Telefono
              </th>
              <th className="text-start p-2 border border-border dark:border-shadow-dark">
                Documentos
              </th>
              <th className="text-start p-2 border border-border dark:border-shadow-dark">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className=" text-black dark:text-white">
            {requests.map((request: any, index: any) => (
              <tr
                key={index}
                className=" bg-black-02 hover:bg-black-05 dark:hover:bg-white-10"
              >
                <td className="p-2 border border-border dark:border-shadow-dark"></td>
                <td className="p-2 border border-border dark:border-shadow-dark">
                  <div className="w-full overflow-hidden">
                    <input
                      className="w-full bg-transparent focus:outline-none number-input-hide-arrows"
                      type="text"
                      value={request.dni}
                      onChange={(e) => {
                        const newRequests = [...requests];
                        newRequests[index].dni = e.target.value;
                        handleRequests(newRequests);
                      }}
                      style={{
                        minWidth: "0",
                      }}
                    />
                  </div>
                </td>
                <td className="p-2 border border-border dark:border-shadow-dark">
                  <textarea
                    className="w-full resize-none bg-transparent focus:outline-none"
                    value={request.fullname}
                    onChange={(e) => {
                      const newRequests = [...requests];
                      newRequests[index].fullname = e.target.value;
                      handleRequests(newRequests);
                    }}
                    rows={1}
                    style={{
                      minHeight: "1.5rem",
                      overflow: "hidden",
                    }}
                    onInput={(e) => {
                      // Autoajuste de altura
                      e.currentTarget.style.height = "auto";
                      e.currentTarget.style.height =
                        e.currentTarget.scrollHeight + "px";
                    }}
                  />
                </td>
                <td className="p-2 border border-border dark:border-shadow-dark">
                  <div className="w-full h-full overflow-hidden">
                    <input
                      className="w-full bg-transparent focus:outline-none number-input-hide-arrows"
                      type="text"
                      value={request.phone}
                      onChange={(e) => {
                        const newRequests = [...requests];
                        newRequests[index].phone = e.target.value;
                        handleRequests(newRequests);
                      }}
                      style={{
                        minWidth: "0",
                      }}
                    />
                  </div>
                </td>
                <td className="p-2 border border-border dark:border-shadow-dark relative">
                    <div className="flex justify-between items-start w-full">
                        <div className="flex flex-wrap gap-1 flex-1">
                        {request.docs.map((doc: any, docIndex: any) => (
                            <span
                            key={docIndex}
                            className="bg-white border border-border text-black py-0.5 px-2 rounded-[5px]"
                            >
                            {doc.name}
                            </span>
                        ))}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-white border border-border text-border rounded-[5px] ml-auto"
                          onClick={() => toggleOpenOptions(index)}
                        >
                         <GoPlus className="w-[16px] h-[16px]"/>
                        </motion.button>
                    </div>
                    <DocsChecklist
                        openIndex={openIndex}
                        index={index}
                        request={request}
                        handleOpen={handleOpenOptionsIndex}
                        handleDocCheckbox={handleDocCheckbox}
                    />
                </td>
                <td className="p-2 border border-border dark:border-shadow-dark">
                  <button className="cursor-pointer">Confirmar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="m-2 bg-tranparent border-2 hover:bg-border border-black text-[14px] text-black rounded-[5px]"
          onClick={addRow}
        >
          <GoPlus className="w-[25px] h-[25px]"/>
        </motion.button>
      </div>
    )
}