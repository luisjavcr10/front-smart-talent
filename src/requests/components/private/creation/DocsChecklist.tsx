import { Checkbox } from "@/shared/components/checkbox";
import { useRef, useEffect } from "react";
import { RequestsType } from "@/requests/types/RequestsListType";

const DOCUMENT_OPTIONS = [
    { name: "Verificación Domiciliaria" },
    { name: "Verificación Laboral" },
    { name: "Antecedentes penales" },
    { name: "Verificacion crediticia" },
    { name: "Verificacion natal" },
];

export const DocsChecklist = ({
    request,
    index,
    openIndex,
    handleDocCheckbox,
    handleOpen
}:Readonly<{
    request: RequestsType,
    index:number,
    openIndex:number | null,
    handleDocCheckbox:(rowIndex: number, docName: string, checked: boolean)=>void,
    handleOpen: ()=>void
}>) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            handleOpen();
        }
      };
  
      if (openIndex === index) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [openIndex === index, handleOpen])

   
    if(openIndex === index){
        return (
            <div  ref={modalRef} className="w-52 absolute top-full right-10 mt-1 z-10">
              <div className="flex flex-col gap-1 bg-white dark:bg-black rounded-[4px] shadow-doc-options border border-white-1 dark:border-black-2">
                {DOCUMENT_OPTIONS.map((option, optIdx) => {
                  const checked = request.docs.some(
                    (doc: { name: string; state: boolean }) => doc.name === option.name
                  );
                  return (
                    <div
                      key={optIdx}
                      className="flex justify-between items-center gap-4 p-2 cursor-pointer border-b border-white-1 dark:border-black-2 last:border-b-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{option.name}</span>
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(checked: boolean) =>
                          handleDocCheckbox(index, option.name, checked)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
        );
    }
};
