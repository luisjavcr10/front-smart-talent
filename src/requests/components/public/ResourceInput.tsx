interface ResourceInputProps {
    name: string;
    allowedFileTypes: string[];
}

export const ResourceInput = (props: ResourceInputProps) => {
    return (
        <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm text-black">
                {props.name}
            </label>
            {props.allowedFileTypes.length === 0 ? (
                <input
                    type="text"
                    placeholder="Agregar un comentario"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 
                    rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                    placeholder-gray-400 dark:placeholder-gray-300
                    transition-all duration-200"
                />
            ) : (
                <div className="relative">
                    <input
                        type="file"
                        accept={props.allowedFileTypes.join(',')}
                        className="w-full text-sm file:mr-4 file:py-2 file:px-4 
                        file:rounded-md file:border-0 file:text-sm file:font-medium
                        file:bg-main file:text-white hover:file:bg-main-dark
                        text-gray-600 dark:text-gray-200
                        cursor-pointer border border-gray-300 dark:border-gray-600 rounded-md
                        focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent
                        transition-all duration-200"
                    />
                </div>
            )}
        </div>
    );
};