"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Users from "../database/models/customer.model";

export const getCustomers = async ({ limit }: getCustomersParams) => {
  try {
    await connectToDatabase();

    const customersData = Users.find({}).limit(limit);

    return { customers: JSON.parse(JSON.stringify(customersData)) };
  } catch (error) {
    handleError(error);
  }
};
