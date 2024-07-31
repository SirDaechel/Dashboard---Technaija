"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Users from "../database/models/customer.model";
import { revalidatePath } from "next/cache";

export const getCustomers = async ({ limit }: getCustomersParams) => {
  try {
    await connectToDatabase();

    const customersData = await Users.find({}).limit(limit);

    return { customers: JSON.parse(JSON.stringify(customersData)) };
  } catch (error) {
    handleError(error);
  }
};

// Get customers with their number orders
export const getCustomersWithOrderCount = async ({
  limit,
  page,
}: GetCustomersWithOrderCountParams) => {
  try {
    await connectToDatabase();

    let customerQuery;

    customerQuery = Users.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "email", // Use the 'email' field that is common in both Users and Orders schemas
          foreignField: "email", // Match it with the 'email' field in the Orders collection
          as: "userOrders",
        },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          username: 1,
          firstName: 1,
          lastName: 1,
          photo: 1,
          numberOfOrders: { $size: "$userOrders" },
        },
      },
    ]).limit(limit);

    const customersCount = await Users.find({}).countDocuments();

    // Apply pagination if page is provided
    if (page) {
      customerQuery = customerQuery.skip((page - 1) * limit);
    }

    // Get the total number of the current customer query
    const totalPages = Math.ceil(customersCount / limit);

    const pageNumbers: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const customersData = await customerQuery;

    return {
      customers: JSON.parse(JSON.stringify(customersData)),
      pageNumbers,
    };
  } catch (error) {
    handleError(error);
  }
};

export const deleteCustomer = async ({
  customers,
  path,
}: deleteCustomersParams) => {
  try {
    await connectToDatabase();

    // Construct an array of ids from customers
    const idsToDelete = customers.map((customer) => customer.id);

    // Perform the deletion
    await Users.deleteMany({
      _id: { $in: idsToDelete },
    });

    revalidatePath(path ?? "");
  } catch (error) {
    handleError(error);
  }
};
