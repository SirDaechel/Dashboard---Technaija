import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  category: { type: String, required: true },
});

const categories = models.categories || model("categories", CategorySchema);

export default categories;
