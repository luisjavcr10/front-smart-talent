interface ResourceInputProps {
    name: string;
    allowedFileTypes: string[];
    onChange: (value: File[] | string | null) => void;
}

export const ResourceInput = (props: ResourceInputProps) => {

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const filesArray = Array.from(files);
            props.onChange(filesArray);
        }
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value);
    };

    return (
        <div className="flex py-[14px]">
            <div className="flex w-full justify-between align-center">
                <div className="text-[16px] text-black-2">
                    {props.name}
                </div>
                {props.allowedFileTypes.length === 0 ? (
                    <input
                        type="text"
                        placeholder=""
                        onChange={handleTextChange}
                        className="w-full max-w-[400px] px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 
                        rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent 
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                        placeholder-gray-400 dark:placeholder-gray-300
                        transition-all duration-200"
                    />
                ) : (
                    <div className="relative">
                        <input
                            type="file"
                            multiple
                            accept={props.allowedFileTypes.join(',')}
                            onChange={handleFileChange}
                            className="w-full max-w-[200px] text-sm
                            file:mr-0 file:py-[6px] file:px-[68px]
                            file:rounded-[6px] file:border-[1px] file:border-black-2
                            file:text-[10px] file:font-medium
                            file:bg-white file:text-black-2
                            hover:file:bg-black-2 hover:file:text-white hover:file:border-transparent
                            file:w-full
                            [&:not(:placeholder-shown)::file-selector-button]:content-none
                            text-black-2 text-center
                            cursor-pointer
                            transition-all duration-200"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};