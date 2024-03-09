import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      photo: { type: String, required: true },
      model: { type: String, required: true },
      user: { type: String, required: true },
      category: { type: String, required: true },
    },
  ],
  date: { type: String, required: true },
  status: { type: String, required: true },
  channel: { type: String, required: true },
  userId: { type: String, required: true },
  userPhoto: { type: String, required: true },
});

const Orders = models.Orders || model("Orders", OrderSchema);

export default Orders;
