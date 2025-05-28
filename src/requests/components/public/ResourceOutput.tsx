import { apiClient } from "@/lib/axios/client";

interface ResourceOutputProps {
    name: string;
    value: string | null ;
}

export const ResourceOutput = ({ name, value = '' }: ResourceOutputProps) => {
    const isFileReference = (value: string): boolean => {
        value = value == null ? '' : value
        const fileExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt', '.xls', '.xlsx', '.csv'];
        const hasExtension = fileExtensions.some(ext => value.toLowerCase().endsWith(ext));
        const hasPathSeparator = value.includes('/') || value.includes('\\');
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
        
        return hasExtension || hasPathSeparator || isUUID;
    };

    const handleDownload = async (e: React.MouseEvent) => {
        e.preventDefault();
        
        try {
            const response = await apiClient.post(`upload/read-signed-url`, {
                fileName: value,
            });
            
            if (response.status !== 200) {
                throw new Error('No se pudo obtener la URL firmada');
            }
            const signedUrl = response.data.signedUrl;
            window.open(signedUrl, '_blank');
        } catch (error) {
            console.error('Error al descargar el documento:', error);
            alert('Error al descargar el documento. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    return (
        <div className="flex py-[14px]">
            <div className="flex w-full justify-between align-center">
                <div className="text-[16px] text-black-2">
                    {name}
                </div>
                
                {isFileReference(value == null ? '' : value) ? (
                    <div className="flex items-center">
                        <a 
                            href="#"
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-4 py-2 w-full max-w-[200px]
                            text-[10px] text-black-2 bg-white
                            border border-black-2 rounded-md
                            hover:bg-black-2 hover:text-white
                            transition-all duration-200"
                        >
                            Descargar documento
                        </a>
                    </div>
                ) : (
                    <div className="w-full max-w-[400px] px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 
                    rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                    placeholder-gray-400 dark:placeholder-gray-300
                    transition-all duration-200">
                        {value}
                    </div>
                )}
            </div>
        </div>
    );
};