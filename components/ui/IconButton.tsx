import Image from "next/image";

type ButtonProp = {
  classname: string;
  src: string;
  text: string;
};

const Button = ({ classname, src, text }: ButtonProp) => {
  return (
    <button
      type="button"
      className={`hover:bg-[#45474B] py-3 px-4 rounded-md transition ${classname}`}
    >
      <Image
        className="m:w-[25px] m:h-[25px]"
        src={src}
        width={20}
        height={20}
        alt={text}
      />
      <p className="text-white">{text}</p>
    </button>
  );
};

export default Button;
