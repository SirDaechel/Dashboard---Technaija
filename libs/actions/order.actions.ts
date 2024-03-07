"use server";

import { connectToDatabase } from "../database";
import { formatDateToCustom, handleError } from "../utils";
import Orders from "../database/models/order.model";

// Get Orders
export const getOrders = async (limit: number, page?: number) => {
  try {
    await connectToDatabase();

    let ordersQuery;

    if (page !== undefined) {
      const modifiedLimit = page * limit;
      ordersQuery = Orders.find({}).limit(modifiedLimit);
    } else {
      ordersQuery = Orders.find({}).limit(limit);
    }

    const ordersData = await ordersQuery;
    const ordersCount = await Orders.countDocuments({});

    const newLimit = page && page * limit;

    return {
      orders: JSON.parse(JSON.stringify(ordersData)),
      totalPages: Math.ceil(ordersCount / limit),
      newLimit,
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

    return {
      theTotalRevenue: todayOrders.length > 0 ? todayOrders[0].totalAmount : 0,
      percentageChange: percentageChange,
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

    return {
      theTotalRevenue:
        lastMonthsOrders.length > 0 ? lastMonthsOrders[0].totalAmount : 0,
      percentageChange: percentageChange,
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

    return {
      theTotalRevenue:
        lastSixMonthOrders.length > 0 ? lastSixMonthOrders[0].totalAmount : 0,
      percentageChange: percentageChange,
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

    return orders.length > 0 ? orders[0].totalAmount : 0;
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
