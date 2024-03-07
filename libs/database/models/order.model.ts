import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  firstname: { type: String, required: true, unique: true },
  lastname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  amount: { type: Number, required: true, unique: true },
  products: [{ type: String, required: true }],
  date: { type: String, required: true },
  status: { type: String, required: true },
  channel: { type: String, required: true },
});

const Orders = models.Orders || model("Orders", OrderSchema);

export default Orders;
