export const UserTypeButton = ({
    userType,
    hanldeUserType,
    expectedType,
    isUpdate,
}:Readonly<{
    userType: 'NATURAL' | 'JURIDICA',
    hanldeUserType: () => void,
    expectedType:'NATURAL' | 'JURIDICA',
    isUpdate?:boolean
}>) => {
    return(
        <button 
            onClick={hanldeUserType}
            className={`
               ${userType===expectedType? 'bg-main-2plus text-black': 'bg-white text-medium'}
                border border-medium 
                py-1 px-4 rounded-[6px] font-karla font-light text-[14px]
                ${isUpdate && userType!==expectedType? 'pointer-events-none cursor-not-allowed': 'cursor-pointer'}
            `}
        >
            Persona {expectedType}
        </button>
    )
}