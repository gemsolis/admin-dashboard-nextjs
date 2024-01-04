"use server";

import { revalidatePath } from "next/cache";
import { User, Product, Transaction } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

// Add Actions
export const addUser = async (formData) => {
  const { username, email, img, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      img,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData) => {
  const { title, category, price, stock, ...optionalFields } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    // Validate required fields
    if (!title || !category || !price || !stock) {
      throw new Error("Missing required parameters");
    }

    // Create a new product with required and optional fields
    const newProductData = {
      title,
      category,
      price,
      stock,
      ...optionalFields,
    };

    const newProduct = new Product(newProductData);

    await newProduct.save();
  } catch (err) {
    throw new Error("Failed to create product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const addTransaction = async (formData) => {
  const { title, invoice, status, amount, desc } = Object.fromEntries(formData);

  try {
    connectToDB();
    const newTransaction = new Transaction({
      title,
      invoice,
      status,
      amount,
      desc,
    });

    await newTransaction.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create transaction!");
  }

  revalidatePath("/dashboard/transactions");
  redirect("/dashboard/transactions");
};

//Delete Actions
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};

export const deleteTransaction = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Transaction.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete transaction!");
  }

  revalidatePath("/dashboard/transactions");
};

//Update Actions

export const updateUser = async (formData) => {
  const {
    id,
    username,
    email,
    img,
    password,
    phone,
    address,
    isAdmin,
    isActive,
  } = Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      username,
      email,
      img,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateProduct = async (formData) => {
  const { id, title, category, price, stock, color, size, desc } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      title,
      category,
      price,
      stock,
      color,
      size,
      desc,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const updateTransaction = async (formData) => {
  const { id, title, invoice, amount, status, desc } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      title,
      invoice,
      amount,
      status,
      desc,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Transaction.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update transaction!");
  }

  revalidatePath("/dashboard/transactions");
  redirect("/dashboard/transactions");
};

//Log In

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
