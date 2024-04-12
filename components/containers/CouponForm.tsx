"use client";

import { TCouponSchema, couponSchema } from "@/libs/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputBox from "../ui/InputBox";
import { createCoupon } from "@/libs/actions/coupon.action";
import { useRouter } from "next/navigation";

const CouponForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCouponSchema>({ resolver: zodResolver(couponSchema) });

  const onSubmit = async (data: TCouponSchema) => {
    // Make the code uppercase before submission
    data.code = data.code.toUpperCase();
    await createCoupon({ coupon: data, path: "/coupons" });
    router.push("/coupons");
    reset();
  };

  return (
    <section>
      <div className="mt-4 border-[1px] border-gray-300 p-4 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputBox
            inputRegister={register("code")}
            label="Coupon Code"
            htmlFor="Coupon Code"
            inputType="text"
            style="uppercase"
            required
            error={
              errors.code && (
                <p className="text-red-500">{`${errors.code.message}`}</p>
              )
            }
          />
          <InputBox
            inputRegister={register("discount")}
            label="Discount"
            htmlFor="Discount"
            inputType="number"
            required
            error={
              errors.discount && (
                <p className="text-red-500">{`${errors.discount.message}`}</p>
              )
            }
          />
          <InputBox
            inputRegister={register("limit")}
            label="Coupon Limit"
            htmlFor="Coupon Limit"
            inputType="number"
            error={
              errors.limit && (
                <p className="text-red-500">{`${errors.limit.message}`}</p>
              )
            }
          />
          <button
            type="submit"
            className={`mt-6 p-3 disabled:bg-gray-100 disabled:text-[#272829] duration-200 transition disabled:duration-200 disabled:transition disabled:cursor-not-allowed ${
              isSubmitting
                ? "bg-gray-100 text-[#272829]"
                : "bg-[#272829] text-white"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "...submitting" : "Create coupon"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CouponForm;
