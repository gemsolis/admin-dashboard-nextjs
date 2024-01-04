import { User, Product, Transaction } from "./models";
import { connectToDB } from "./utils";

//Fetching Group Data

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 8;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users.");
  }
};

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 8;

  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products.");
  }
};

export const fetchTransactions = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 8;

  try {
    connectToDB();
    const count = await Transaction.find({
      title: { $regex: regex },
    }).count();
    const transactions = await Transaction.find({
      title: { $regex: regex },
    })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, transactions };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transactions.");
  }
};

//Fetchign Single Data

export const fetchUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user.");
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product.");
  }
};

export const fetchTransaction = async (id) => {
  try {
    connectToDB();
    const transaction = await Transaction.findById(id);
    return transaction;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transaction.");
  }
};

//Fetching Amount

export const fetchTransactionAmount = async () => {
  try {
    connectToDB();
    const result = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    return result[0]?.totalAmount || 0;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch and sum transactions.");
  }
};

//Fetching Count

export const fetchTotalTransactionCount = async () => {
  try {
    connectToDB();

    const count = await Transaction.countDocuments();

    return count;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch total transaction count.");
  }
};

export const fetchTotalUsersCount = async () => {
  try {
    connectToDB();

    const count = await User.countDocuments();
    //Lessening the amount by 1 due to master admin being hidden
    const totalAmount = count - 2;
    return totalAmount;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch total transaction count.");
  }
};

export const fetchMonthTransactionAmount = async () => {
  try {
    connectToDB();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const result = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    return result[0]?.totalAmount || 0;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch and sum transactions this month.");
  }
};
