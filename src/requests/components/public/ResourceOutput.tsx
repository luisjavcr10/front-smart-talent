import { apiClient } from "@/lib/axios/client";

interface ResourceOutputProps {
    name: string;
    value: string;
}

export const ResourceOutput = (props: ResourceOutputProps) => {
    const isFileReference = (value: string): boolean => {
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
                fileName: props.value,
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
        <div className="flex gap-4">
            <div className="flex flex-col gap-2 mb-4 flex-1">
                <label className="text-sm font-medium text-black dark:text-white">
                    {props.name}
                </label>
                
                {isFileReference(props.value) ? (
                    <div className="flex items-center">
                        <a 
                            href="#"
                            onClick={handleDownload}
                            className="px-4 py-2 bg-main hover:bg-main-dark text-white rounded-md text-sm flex items-center gap-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Descargar documento
                        </a>
                    </div>
                ) : (
                    <div className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 
                        rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white min-h-[60px] overflow-auto">
                        {props.value}
                    </div>
                )}
            </div>
        </div>
    );
};