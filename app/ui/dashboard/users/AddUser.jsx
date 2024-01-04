"use client";

import Link from "next/link";
import Alert from "../alert/Alert";
import { useState } from "react";
import { addUser } from "@/app/lib/actions";
import { MdClose } from "react-icons/md";

const AddUser = () => {
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
      console.log("Cloudinary Upload Response:", data);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image to Cloudinary.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const uploadedImageUrl = await uploadImage(formData.get("image"));

      formData.set("img", uploadedImageUrl);

      await addUser(formData);
    } catch (err) {
      console.error(err);
      setError("Username must be unique and all field must be filled.");
    }
  };

  const handleCloseAlert = () => {
    setError(null);
  };
  return (
    <div className="w-full global-bg flex flex-col gap-5 my-5 bg-slate-800 p-5 rounded-md ">
      <div className=" flex justify-center">
        {error && <Alert message={error} onClose={handleCloseAlert} />}
      </div>
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">Add User</h3>
        <Link href="/dashboard/users" className="self-end">
          <button className="bg-red-500 p-2 rounded-md">
            <MdClose />
          </button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="global-form w-full flex justify-between gap-5 flex-wrap"
      >
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input type="text" name="phone" placeholder="Phone" />
        <select name="isAdmin" placeholder="isAdmin?" required>
          <option value={false}>isAdmin?</option>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
        <select name="isActive" required>
          <option value={false}>isActive?</option>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
        <div className="w-full">
          <textarea
            name="address"
            placeholder="Address"
            className="w-[100%] resize-none"
          ></textarea>
        </div>
        <input type="file" name="image" accept="image/*" className="w-full" />
        <button className="w-full bg-teal-500 p-5 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
