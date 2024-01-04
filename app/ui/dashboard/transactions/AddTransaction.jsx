"use client";

import { useState } from "react";
import { addTransaction } from "@/app/lib/actions";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import Alert from "../alert/Alert";

const AddTransaction = () => {
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      await addTransaction(formData);
    } catch (err) {
      console.error(err);
      setError("Failed to add transaction!");
    }
  };
  const handleCloseAlert = () => {
    setError(null);
  };

  return (
    <div className="w-full global-bg flex flex-col gap-5 my-5 p-5 rounded-md ">
      <div className=" flex justify-center">
        {error && <Alert message={error} onClose={handleCloseAlert} />}
      </div>
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">Add Transaction</h3>
        <Link href="/dashboard/transactions" className="self-end">
          <button className="bg-red-500 p-2 rounded-md">
            <MdClose />
          </button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="global-form w-full flex justify-between gap-5 flex-wrap"
      >
        <input type="text" name="title" placeholder="Transaction Name" />
        <input type="text" name="invoice" placeholder="Invoice No." />
        <input type="number" name="amount" placeholder="Amount" step="0.01" />
        <select name="status">
          <option value="Processing">Processing</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <div className="w-full">
          <textarea
            name="desc"
            placeholder="Description"
            className="w-[100%] resize-none"
          ></textarea>
        </div>
        <button className="w-full bg-teal-500 p-5 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default AddTransaction;
