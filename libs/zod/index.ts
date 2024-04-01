import { z } from "zod";

// CREATE / EDIT PRODUCT SCHEMA
export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Use 3 characters or more")
    .max(40, "Description must be less than 40 characters"),
  price: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseInt(val, 10);
    }
    return val;
  }, z.number()),
  sales_price: z.preprocess((val) => {
    // Check if val is a string and not empty
    if (typeof val === "string" && val.trim() !== "") {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) {
        return parsed; // Return the parsed number if it's valid
      }
    }
    // Return undefined if val is null, an empty string, or not a number
    return undefined;
  }, z.number().optional()),
  short_description: z.string().optional(),
  description: z
    .string()
    .min(3, "Use 3 characters or more")
    .max(1000, "Description must be less than 1000 characters"),
  featured_image: z.string(),
});

export type TProductSchema = z.infer<typeof productSchema>;
