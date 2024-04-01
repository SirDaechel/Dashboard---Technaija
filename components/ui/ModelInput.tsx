import Image from "next/image";
import { useState } from "react";

type ModelInputType = {
  label: string;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
};

const ModelInput: React.FC<ModelInputType> = ({
  label,
  data,
  setData,
  error,
  setError,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addModel = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Add the input value to the items array
      if (inputValue.trim() !== "") {
        setData([...data, { text: inputValue.trim() }]);
        setInputValue("");
        setError && setError("");
      }
    }
  };

  const removeModel = (indexToRemove: number) => {
    setData(data.filter((_, index) => index !== indexToRemove));
  };

  return (
    <section className="w-full mt-4">
      <label className="text-base font-light ">{label}</label>
      <div className="flex flex-wrap items-center justify-start gap-2 p-3 transition border-[1px] border-gray-400 w-full min-h-12 bg-white">
        <ul className="flex flex-wrap items-center justify-start gap-2">
          {data.map((d, index) => (
            <li
              key={index}
              className="bg-[#272829] text-white text-sm rounded p-2 flex items-center justify-center gap-2"
            >
              {d.text}
              <span
                className="text-base cursor-pointer"
                onClick={() => removeModel(index)}
              >
                <Image
                  src="/close-white.svg"
                  width={17}
                  height={17}
                  alt="remove-tag"
                />
              </span>
            </li>
          ))}
        </ul>

        <input
          type="text"
          className="outline-none border-0 bg-transparent font-openSans font-normal text-sm"
          placeholder="type and press enter..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => addModel(e)}
        />
      </div>
      <p className="text-red-500">{error && error}</p>
    </section>
  );
};

export default ModelInput;
