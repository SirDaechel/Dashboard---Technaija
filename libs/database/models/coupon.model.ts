import { Schema, model, models } from "mongoose";

const CouponSchema = new Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  limit: { type: Number },
});

const Coupons = models.Coupons || model("Coupons", CouponSchema);

export default Coupons;
