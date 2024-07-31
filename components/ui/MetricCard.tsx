import Image from "next/image";
import MetricTimeFrame from "../builders/MetricTimeFrame";
import { Dispatch, SetStateAction, useState } from "react";

type MetricCardProp = {
  type: string;
  icon?: string;
  title: string;
  data: string | number | undefined;
  icon2: string | null;
  setter: Dispatch<SetStateAction<string>>;
  percentageValue: number | undefined;
  percentageSetter: Dispatch<SetStateAction<number | undefined>>;
};

const MetricCard = ({
  type,
  icon,
  title,
  data,
  icon2,
  setter,
  percentageValue,
  percentageSetter,
}: MetricCardProp) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string | null>(
    "6 months"
  );
  const [showTimeFrame, setShowTimeFrame] = useState(false);

  return (
    <section className="w-full border-[1px] border-gray-300 p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between gap-8 border-b-[1px] border-b-gray-300 pb-4">
        <span className="flex items-center gap-3">
          {icon && <Image src={icon} width={15} height={15} alt={title} />}
          <p className="text-base font-normal">{title}</p>
        </span>
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-3 p-2 rounded-xl border-[1px] border-gray-300"
            onClick={() => setShowTimeFrame((prev) => !prev)}
          >
            <span className="flex items-center justify-between gap-1 w-[5rem]">
              <p className="text-xs font-normal capitalize">
                {selectedTimeFrame}
              </p>
              <Image
                src="/chevron-arrow-down.svg"
                width={17}
                height={17}
                alt="arrow"
              />
            </span>
          </button>
          <MetricTimeFrame
            type={type}
            setSelectedTimeFrame={setSelectedTimeFrame}
            showTimeFrame={showTimeFrame}
            setShowTimeFrame={setShowTimeFrame}
            setter={setter}
            percentageSetter={percentageSetter}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium text-2xl">{data}</p>
        <span className="flex items-center gap-2">
          {percentageValue !== undefined && (
            <>
              {icon2 !== null && (
                <Image src={icon2} width={20} height={20} alt="arrow" />
              )}
              <p
                className={`font-medium ${
                  percentageValue && percentageValue > 0
                    ? "text-[#65B741]"
                    : "text-[#DF2E38FF]"
                }`}
              >
                {percentageValue && percentageValue > 0
                  ? `+${percentageValue}%`
                  : `${percentageValue}%`}
              </p>
            </>
          )}
        </span>
      </div>
    </section>
  );
};

export default MetricCard;
