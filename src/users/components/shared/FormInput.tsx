export const FormInput = ({
  fieldName,
  value,
  handleOnChange,
  error,
  errorMessage,
}:Readonly<{
  fieldName: string;
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
}>) => {
  return (
    <div className="flex flex-col md:flex-row gap-1 md:gap-4">
      <label className="min-w-[120px]">{fieldName}</label>
      <div className="flex-1 flex flex-col">
        <input
          value={value}
          onChange={handleOnChange}
          type="text"
          className={`border ${error ? 'border-red-500' : 'border-white-1'} py-0.5 px-2 rounded flex-1 outline-main-2plus`}
        />
        {error && errorMessage && (
          <span className="text-red-500 text-xs mt-1">{errorMessage}</span>
        )}
      </div>
    </div>
  );
};
