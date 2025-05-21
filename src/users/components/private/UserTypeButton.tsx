export const UserTypeButton = ({
    userType,
    hanldeUserType,
    expectedType
}:Readonly<{
    userType: 'Natural' | 'Jurídica',
    hanldeUserType: () => void,
    expectedType:'Natural' | 'Jurídica',
}>) => {
    return(
        <button 
            onClick={hanldeUserType}
            className={`
               ${userType===expectedType? 'bg-main-2plus text-black': 'bg-white text-medium'}
                border border-medium 
                py-1 px-4 rounded-[6px] font-karla font-light text-[14px]
            `}
        >
            Persona {expectedType}
        </button>
    )
}