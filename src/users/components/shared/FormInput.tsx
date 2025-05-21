export const FormInput = ({
  fieldName,
  value,
  handleOnChange,
}:Readonly<{
  fieldName: string;
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>) => {
  return (
    <div className="flex flex-col md:flex-row gap-1 md:gap-4">
      <label className="min-w-[120px]">{fieldName}</label>
      <input
        value={value}
        onChange={handleOnChange}
        type="text"
        className="border border-white-1 py-0.5 px-2 rounded flex-1 outline-main-2plus"
      />
    </div>
  );
};
