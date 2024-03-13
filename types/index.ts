type TOrders = {
  _id: string;
  orderId: string;
  firstname: string;
  lastname: string;
  email: string;
  amount: number;
  products: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    photo: string;
    model: string;
    user: string;
    category: string;
  }[];
  date: string;
  status: string;
  channel: string;
  userId: string;
  userPhoto: string;
};

type getOrdersParams = {
  limit: number;
  page?: number;
  status?: string;
};

type getCustomersParams = {
  limit: number;
};
