import Image from "next/image";

type MetricCardProp = {
  icon?: string;
  title: string;
  data: string | number;
  percentage?: string;
  icon2: string;
};

const MetricCard = ({
  icon,
  title,
  data,
  percentage,
  icon2,
}: MetricCardProp) => {
  return (
    <section className="w-full border-[1px] border-gray-300 p-4 flex flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between gap-8 border-b-[1px] border-b-gray-300 pb-4">
        <span className="flex items-center gap-3">
          {icon && <Image src={icon} width={15} height={15} alt={title} />}
          <p className="text-base font-normal">{title}</p>
        </span>
        <button
          type="button"
          className="flex items-center gap-3 p-2 rounded-xl border-[1px] border-gray-300"
        >
          <span className="flex items-center gap-1">
            <p className="text-xs font-normal">6 months</p>
            <Image
              src="/chevron-arrow-down.svg"
              width={17}
              height={17}
              alt="arrow"
            />
          </span>
        </button>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium text-2xl">{data}</p>
        <span className="flex items-center gap-2">
          <Image src={icon2} width={20} height={20} alt="arrow" />
          <p className="text-[#65B741] font-medium">{percentage}</p>
        </span>
      </div>
    </section>
  );
};

export default MetricCard;
