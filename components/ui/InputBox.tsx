import { Dispatch, SetStateAction } from "react";

type InputType = {
  inputRegister?: any;
  label: string;
  htmlFor: string;
  inputType: string;
  error?: any;
  placeholder?: string;
  required?: boolean;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  style?: string;
};

const InputBox = ({
  inputRegister,
  label,
  htmlFor,
  inputType,
  error,
  placeholder,
  required,
  value,
  setValue,
  style,
}: InputType) => {
  return (
    <section className="w-full flex flex-col">
      <label className="text-base font-light flex gap-1" htmlFor={htmlFor}>
        {label}
        <p className={`${required ? "text-red-400" : "text-[#272829]"}`}>
          {required ? "*" : "(Optional)"}
        </p>
      </label>
      <input
        {...inputRegister}
        className={`p-3 transition border-[1px] border-gray-400 text-sm focus:border-[#272829] focus:transition focus:outline-none ${style}`}
        type={inputType}
        id={htmlFor}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue && e.target.value}
      />
      {error}
    </section>
  );
};

export default InputBox;
