"use client";

import { useState } from "react";
import { addProduct } from "@/app/lib/actions";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import Alert from "../alert/Alert";

const AddProducts = () => {
  const [error, setError] = useState(null);

  const uploadImage = async (imageFile) => {
    try {
      const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/dy9yanikj/image/upload";
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "admin-next-preset");

      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      throw new Error("Failed to upload image to Cloudinary.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const uploadedImageUrl = await uploadImage(formData.get("image"));
      formData.set("img", uploadedImageUrl);

      await addProduct(formData);
    } catch (err) {
      setError("Product Name must be unique and all field must be filled.");
    }
  };

  const handleCloseAlert = () => {
    setError(null);
  };
  return (
    <div className="w-full global-bg  flex flex-col gap-5 my-5 p-5 rounded-md ">
      <div className=" flex justify-center">
        {error && <Alert message={error} onClose={handleCloseAlert} />}
      </div>
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">Add Product</h3>
        <Link href="/dashboard/products" className="self-end">
          <button className="bg-red-500 p-2 rounded-md">
            <MdClose />
          </button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="global-form w-full flex justify-between gap-5 flex-wrap "
      >
        <input type="text" name="title" placeholder="Product Name" required />
        <select name="category" required>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
          <option value="Accessories">Accessories</option>
          <option value="Others">Others</option>
        </select>
        <input type="number" name="price" placeholder="Price" required />
        <input type="number" name="stock" placeholder="Stock" required />
        <input type="text" name="color" placeholder="Color" />
        <input type="text" name="size" placeholder="Size" />
        <textarea
          name="desc"
          placeholder="Description"
          className="w-[100%] resize-none"
        ></textarea>
        <input type="file" name="image" accept="image/*" />
        <button className="w-full bg-teal-500 p-5 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default AddProducts;
