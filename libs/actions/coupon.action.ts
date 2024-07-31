"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Coupons from "../database/models/coupon.model";
import { revalidatePath } from "next/cache";

export const createCoupon = async ({ coupon, path }: NewCouponParams) => {
  try {
    await connectToDatabase();

    await Coupons.create(coupon);

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

export const getCoupons = async ({ limit, page }: GetCouponsParam) => {
  try {
    await connectToDatabase();

    let couponQuery;

    couponQuery = Coupons.find({}).limit(limit);

    const couponCount = await Coupons.find({}).countDocuments();

    // Apply pagination if page is provided
    if (page) {
      couponQuery = couponQuery.skip((page - 1) * limit);
    }

    // Get the total number of the current coupon query
    const totalPages = Math.ceil(couponCount / limit);

    const pageNumbers: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const counponsData = await couponQuery;

    return {
      coupons: JSON.parse(JSON.stringify(counponsData.reverse())),
      pageNumbers,
    };
  } catch (error) {
    handleError(error);
  }
};

export const deleteCoupon = async ({ coupons, path }: deleteCouponsParams) => {
  try {
    await connectToDatabase();

    // Construct an array of ids from coupons
    const idsToDelete = coupons.map((coupon) => coupon.id);

    // Perform the deletion
    await Coupons.deleteMany({
      _id: { $in: idsToDelete },
    });

    revalidatePath(path ?? "");
  } catch (error) {
    handleError(error);
  }
};
