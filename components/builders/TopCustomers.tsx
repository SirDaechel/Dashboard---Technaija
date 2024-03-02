import Image from "next/image";

const TopCustomers = () => {
  return (
    <section className="w-full p-2 border-[1px] border-gray-300">
      <h3 className="pb-2 border-b-[1px] border-b-gray-300 font-medium">
        Top customers
      </h3>
      <div className="flex flex-col gap-3 justify-between py-2">
        <div className="flex items-center gap-3">
          <Image
            src="/images/test-photo (1).webp"
            width={40}
            height={40}
            alt="customer-img"
          />
          <div className="w-full flex items-center justify-between">
            <span className="flex flex-col gap-1 items-start">
              <p className="text-sm">David Okpala</p>
              <p className="text-xs text-gray-500 font-normal">
                anayookpala26@gmail.com
              </p>
            </span>
            <p className="p-1 bg-[#272829] text-white rounded-full text-xs">
              65
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/images/test-photo (2).webp"
            width={40}
            height={40}
            alt="customer-img"
          />
          <div className="w-full flex items-center justify-between">
            <span className="flex flex-col gap-1 items-start">
              <p className="text-sm">John Okafor</p>
              <p className="text-xs text-gray-500 font-normal">
                johnokafor43@gmail.com
              </p>
            </span>
            <p className="p-1 bg-[#272829] text-white rounded-full text-xs">
              47
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/images/test-photo (3).webp"
            width={40}
            height={40}
            alt="customer-img"
          />
          <div className="w-full flex items-center justify-between">
            <span className="flex flex-col gap-1 items-start">
              <p className="text-sm">Anna Vitalik</p>
              <p className="text-xs text-gray-500 font-normal">
                annavitalik73@gmail.com
              </p>
            </span>
            <p className="p-1 bg-[#272829] text-white rounded-full text-xs">
              21
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/images/test-photo (4).webp"
            width={40}
            height={40}
            alt="customer-img"
          />
          <div className="w-full flex items-center justify-between">
            <span className="flex flex-col gap-1 items-start">
              <p className="text-sm">Ademola Olu</p>
              <p className="text-xs text-gray-500 font-normal">
                ademolaolu24@gmail.com
              </p>
            </span>
            <p className="p-1 bg-[#272829] text-white rounded-full text-xs">
              11
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCustomers;
