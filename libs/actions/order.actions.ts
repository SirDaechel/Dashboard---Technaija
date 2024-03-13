"use server";

import { connectToDatabase } from "../database";
import { formatDateToCustom, handleError } from "../utils";
import Orders from "../database/models/order.model";

// Get Orders
export const getOrders = async ({ limit, page, status }: getOrdersParams) => {
  try {
    await connectToDatabase();

    let ordersQuery;

    // Aggregation pipeline to get all counts in one go
    const [counts] = await Orders.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          success: {
            $sum: { $cond: [{ $eq: ["$status", "success"] }, 1, 0] },
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          failed: {
            $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] },
          },
        },
      },
    ]);

    const { total, success, pending, failed } = counts;

    // Get the total number of the current order query (this is necessary because the query could change if status is defined)
    const totalPages = Math.ceil(
      status === "success"
        ? success / limit
        : status === "pending"
        ? pending / limit
        : status === "failed"
        ? failed / limit
        : total / limit
    );

    const pageNumbers: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    // Construct the query based on status and page
    let query = { ...(status && { status }) };

    ordersQuery = Orders.find(query).limit(limit).sort({ date: -1 });

    // Apply pagination if page is provided
    if (page) {
      ordersQuery = ordersQuery.skip((page - 1) * limit);
    }

    const ordersData = await ordersQuery;

    return {
      orders: JSON.parse(JSON.stringify(ordersData)),
      pageNumbers: pageNumbers,
      ordersCount: total,
      ordersSuccessCount: success,
      ordersPendingCount: pending,
      ordersFailedCount: failed,
    };
  } catch (error) {
    handleError(error);
  }
};

// Get all the orders count
export const getAllOrdersCount = async () => {
  try {
    await connectToDatabase();

    const allOrders = await Orders.countDocuments();

    return allOrders;
  } catch (error) {
    handleError(error);
  }
};

// Get today's total order amount
export const filterOrdersByToday = async () => {
  try {
    await connectToDatabase();

    // Get current day and format it
    const currentDate = new Date();
    const formattedCurrentDate = formatDateToCustom(currentDate.toISOString());

    // Get current day orders' total amount
    const todayOrders = await Orders.aggregate([
      {
        $match: {
          date: {
            $eq: formattedCurrentDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Get previous day and format it
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    const formattedPreviousDay = formatDateToCustom(previousDate.toISOString());

    // Get previous day orders' total amount
    const previousDayOrders = await Orders.aggregate([
      {
        $match: {
          date: {
            $eq: formattedPreviousDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Calculate the percentage change from previous day total revenue and current day total revenue
    const percentageChange =
      todayOrders.length > 0 && previousDayOrders.length > 0
        ? ((todayOrders[0].totalAmount - previousDayOrders[0].totalAmount) /
            previousDayOrders[0].totalAmount) *
          100
        : 0;

    // Calculate total profit for today (20% of the total revenue)
    const todayProfit =
      todayOrders.length > 0
        ? todayOrders[0].totalAmount - todayOrders[0].totalAmount * 0.6
        : 0;

    // Calculate total profit for today (20% of the total revenue)
    const previousDayProfit =
      previousDayOrders.length > 0
        ? previousDayOrders[0].totalAmount -
          previousDayOrders[0].totalAmount * 0.6
        : 0;

    // Calculate the profit percentage change from previous day total and current day total
    const profitPercentageChange =
      todayProfit && previousDayProfit
        ? ((todayProfit - previousDayProfit) / previousDayProfit) * 100
        : 0;

    return {
      theTotalRevenue: todayOrders.length > 0 ? todayOrders[0].totalAmount : 0,
      percentageChange: percentageChange,
      theTotalProfit: todayProfit,
      profitPercentageChange: profitPercentageChange,
    };
  } catch (error) {
    handleError(error);
  }
};

// Get last month's total order amount
export const filterOrdersByLastMonth = async () => {
  try {
    await connectToDatabase();

    // Get current day
    const currentDate = new Date();

    // Get first day of last month
    const firstDayofLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    // Get last day of last month
    const lastDayofLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    // Format first day of last month and convert to ISO standard
    const startDate = formatDateToCustom(firstDayofLastMonth.toISOString());
    // Format last day of last month and convert to ISO standard
    const endDate = formatDateToCustom(lastDayofLastMonth.toISOString());

    // Get previous month orders' total amount
    const lastMonthsOrders = await Orders.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Get orders' total amount from the period before the last six months
    const beforeLastMonthOrders = await Orders.aggregate([
      {
        $match: {
          date: {
            $lt: startDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Calculate the percentage change from last month total revenue and before last month's total revenue
    const percentageChange =
      lastMonthsOrders.length > 0 && beforeLastMonthOrders.length > 0
        ? ((lastMonthsOrders[0].totalAmount -
            beforeLastMonthOrders[0].totalAmount) /
            beforeLastMonthOrders[0].totalAmount) *
          100
        : 0;

    // Calculate total profit for last month (20% of the total revenue)
    const lastMonthProfit =
      lastMonthsOrders.length > 0
        ? lastMonthsOrders[0].totalAmount -
          lastMonthsOrders[0].totalAmount * 0.6
        : 0;

    // Calculate total profit for before last month (20% of the total revenue)
    const beforeLastMonthProfit =
      beforeLastMonthOrders.length > 0
        ? beforeLastMonthOrders[0].totalAmount -
          beforeLastMonthOrders[0].totalAmount * 0.6
        : 0;

    // Calculate the profit percentage change from last month total and before last month total
    const profitPercentageChange =
      lastMonthProfit && beforeLastMonthProfit
        ? ((lastMonthProfit - beforeLastMonthProfit) / beforeLastMonthProfit) *
          100
        : 0;

    return {
      theTotalRevenue:
        lastMonthsOrders.length > 0 ? lastMonthsOrders[0].totalAmount : 0,
      percentageChange: percentageChange,
      lastMonthProfit: lastMonthProfit,
      profitPercentageChange: profitPercentageChange,
    };
  } catch (error) {
    handleError(error);
  }
};

// Get last six month's total order amount
export const filterOrdersBySixMonths = async () => {
  try {
    await connectToDatabase();

    // Get current day
    const currentDate = new Date();

    // Get first day of last 6 months
    const firstDayofLastSixMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 6,
      1
    );

    // Format first day of last 6 months and convert to ISO standard
    const startDate = formatDateToCustom(firstDayofLastSixMonth.toISOString());

    // Get last 6 months orders' total amount
    const lastSixMonthOrders = await Orders.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Get orders' total amount before last 6 months
    const beforeLastSixMonthOrders = await Orders.aggregate([
      {
        $match: {
          date: {
            $lt: startDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Calculate the percentage change from last 6 months total revenue and before last 6 month's total revenue
    const percentageChange =
      lastSixMonthOrders.length > 0 && beforeLastSixMonthOrders.length > 0
        ? ((lastSixMonthOrders[0].totalAmount -
            beforeLastSixMonthOrders[0].totalAmount) /
            beforeLastSixMonthOrders[0].totalAmount) *
          100
        : 0;

    // Calculate total profit for last six months (20% of the total revenue)
    const lastSixMonthProfit =
      lastSixMonthOrders.length > 0
        ? lastSixMonthOrders[0].totalAmount -
          lastSixMonthOrders[0].totalAmount * 0.6
        : 0;

    // Calculate total profit for before last six months (20% of the total revenue)
    const beforeLastSixMonthProfit =
      beforeLastSixMonthOrders.length > 0
        ? beforeLastSixMonthOrders[0].totalAmount -
          beforeLastSixMonthOrders[0].totalAmount * 0.6
        : 0;

    // Calculate the profit percentage change from last month total and before last month total
    const profitPercentageChange =
      lastSixMonthProfit && beforeLastSixMonthProfit
        ? ((lastSixMonthProfit - beforeLastSixMonthProfit) /
            beforeLastSixMonthProfit) *
          100
        : 0;

    return {
      theTotalRevenue:
        lastSixMonthOrders.length > 0 ? lastSixMonthOrders[0].totalAmount : 0,
      percentageChange: percentageChange,
      lastSixMonthProfit: lastSixMonthProfit,
      profitPercentageChange: profitPercentageChange,
    };
  } catch (error) {
    handleError(error);
  }
};

// Get all time total order amount
export const filterOrdersByAllTime = async () => {
  try {
    await connectToDatabase();

    const orders = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Calculate total all time profit (20% of the total revenue)
    const allTimeProfit =
      orders.length > 0
        ? orders[0].totalAmount - orders[0].totalAmount * 0.6
        : 0;

    return {
      allTimeOrders: orders.length > 0 ? orders[0].totalAmount : 0,
      allTimeProfit: allTimeProfit,
    };
  } catch (error) {
    handleError(error);
  }
};

// Get today's or current date order count
export const getTodayOrders = async () => {
  try {
    await connectToDatabase();

    // Get current day and format it
    const currentDate = new Date();
    const formattedCurrentDate = formatDateToCustom(currentDate.toISOString());

    const ordersToday = await Orders.countDocuments({
      date: { $eq: formattedCurrentDate },
    });

    // Get previous day and format it
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    const formattedPreviousDay = formatDateToCustom(previousDate.toISOString());

    const previousDayOrders = await Orders.countDocuments({
      date: { $eq: formattedPreviousDay },
    });

    // Calculate the percentage change from previous day total orders and current day total orders
    const percentageChange =
      ordersToday && previousDayOrders
        ? ((ordersToday - previousDayOrders) / previousDayOrders) * 100
        : 0;

    return { totalOrders: ordersToday, percentageChange: percentageChange };
  } catch (error) {
    handleError(error);
  }
};

// Get last month's order count
export const getLastMonthOrders = async () => {
  try {
    await connectToDatabase();

    // Get current day
    const currentDate = new Date();

    // Get first day of last month
    const firstDayofLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    // Get last day of last month
    const lastDayofLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    // Format first day of last month and convert to ISO standard
    const startDate = formatDateToCustom(firstDayofLastMonth.toISOString());
    // Format last day of last month and convert to ISO standard
    const endDate = formatDateToCustom(lastDayofLastMonth.toISOString());

    const lastMonthOrders = await Orders.countDocuments({
      date: { $gte: startDate, $lte: endDate },
    });

    const beforeLastMonthOrders = await Orders.countDocuments({
      date: { $lte: startDate },
    });

    // Calculate the percentage change from last month total orders and before last month's total orders
    const percentageChange =
      lastMonthOrders && beforeLastMonthOrders
        ? ((lastMonthOrders - beforeLastMonthOrders) / beforeLastMonthOrders) *
          100
        : 0;

    return { totalOrders: lastMonthOrders, percentageChange: percentageChange };
  } catch (error) {
    handleError(error);
  }
};

// Get last six month's order count
export const getLastSixMonthsOrders = async () => {
  try {
    await connectToDatabase();

    // Get current day
    const currentDate = new Date();

    // Get first day of last 6 months
    const firstDayofLastSixMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 6,
      1
    );

    // Format first day of last 6 months and convert to ISO standard
    const startDate = formatDateToCustom(firstDayofLastSixMonth.toISOString());

    const lastSixMonthsOrders = await Orders.countDocuments({
      date: { $gte: startDate },
    });

    const beforeLastSixMonthsOrders = await Orders.countDocuments({
      date: { $lte: startDate },
    });

    // Calculate the percentage change from last 6 months total orders and before last 6 month's total orders
    const percentageChange =
      lastSixMonthsOrders && beforeLastSixMonthsOrders
        ? ((lastSixMonthsOrders - beforeLastSixMonthsOrders) /
            beforeLastSixMonthsOrders) *
          100
        : 0;

    return {
      totalOrders: lastSixMonthsOrders,
      percentageChange: percentageChange,
    };
  } catch (error) {
    handleError(error);
  }
};

// Get the total number of orders made in each month
export const getEachMonthOrderCount = async (year?: number) => {
  try {
    await connectToDatabase();

    // Get the current year
    let currentYear = new Date().getFullYear();

    if (year) {
      currentYear = new Date().getFullYear() - year;
    }

    // Initialize an array of months
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize an array of orders count
    const ordersCount = new Array(12).fill(0);

    // Loop through the months
    for (let i = 0; i < months.length; i++) {
      // Get the start and end date of the month
      const startDate = new Date(`${currentYear}-${i + 1}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      // Query the Orders collection for the orders made in the month
      const ordersInMonth = await Orders.find({
        date: {
          $gte: formatDateToCustom(startDate.toISOString()),
          $lt: formatDateToCustom(endDate.toISOString()),
        },
      }).countDocuments();

      // Update the orders count array
      ordersCount[i] = ordersInMonth;
    }

    // Return the months and orders count arrays
    return { months: months, ordersCount: ordersCount };
  } catch (error) {
    handleError(error);
  }
};

export const getOrderCategoryCount = async () => {
  try {
    await connectToDatabase();

    const category = await Orders.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    return {
      category: category.map((item) => item._id),
      categoryCount: category.map((item) => item.count),
    };
  } catch (error) {
    handleError(error);
  }
};

// Get top customers (customers with most orders)
export const getTopCustomers = async () => {
  try {
    await connectToDatabase();

    const topCustomers = await Orders.aggregate([
      {
        $group: {
          _id: "$userId", // Group by the user ID
          ordersCount: { $sum: 1 }, // Count the number of orders per user
          firstName: { $first: "$firstname" }, // Get the first name
          lastName: { $first: "$lastname" }, // Get the last name
          email: { $first: "$email" }, // Get the email
          userPhoto: { $first: "$userPhoto" }, // Get the user photo
        },
      },
      {
        $sort: { ordersCount: -1 }, // Sort by ordersCount in descending order
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the results
          userId: "$_id", // Include the userId in the results
          ordersCount: 1, // Include the ordersCount
          firstName: 1, // Include the firstName
          lastName: 1, // Include the lastName
          email: 1, // Include the email
          userPhoto: 1, // Include the userPhoto
        },
      },
    ]);

    return topCustomers;
  } catch (error) {
    handleError(error);
  }
};
