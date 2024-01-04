import { updateTransaction } from "@/app/lib/actions";
import { fetchTransaction } from "@/app/lib/data";
import Link from "next/link";
import { MdClose } from "react-icons/md";

const SingleTransactionPage = async ({ params }) => {
  const { id } = params;
  const transaction = await fetchTransaction(id);
  return (
    <div className="w-full py-5 flex justify-between gap-7">
      <div className="flex-1 form-container global-bg p-5 rounded-md relative">
        <div className="absolute top-3 right-3">
          <Link href="/dashboard/transactions">
            <button className="bg-red-500 p-2 rounded-md">
              <MdClose />
            </button>
          </Link>
        </div>
        <form
          action={updateTransaction}
          className="single-form flex flex-col mt-5"
        >
          <input type="hidden" name="id" value={transaction.id} />
          <label>
            <span>Transaction Name</span>
            <input type="text" name="title" placeholder={transaction.title} />
          </label>
          <label>
            <span>Invoice No.</span>
            <input
              type="text"
              name="invoice"
              placeholder={transaction.invoice}
            />
          </label>
          <label>
            <span>Amount</span>
            <input type="text" name="amount" placeholder={transaction.amount} />
          </label>
          <label>
            <span>Status</span>
            <select name="status">
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
          <label>
            <span>Description</span>
            <textarea
              name="address"
              placeholder={transaction.desc}
              className="w-[100%] resize-none"
            ></textarea>
          </label>

          <button className="w-full bg-teal-500 p-5 rounded-md mt-2">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleTransactionPage;
