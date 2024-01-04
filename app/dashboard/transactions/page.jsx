import {
  fetchTransactions,
  fetchTransactionAmount,
  fetchTotalTransactionCount,
  fetchMonthTransactionAmount,
} from "@/app/lib/data";
import { deleteTransaction } from "@/app/lib/actions";
import { auth } from "@/app/auth";
import { MdOutlineModeEdit, MdDelete, MdArrowDropDown } from "react-icons/md";
import Pagination from "@/app/ui/dashboard/pagination/Pagination";
import PageCard from "@/app/ui/dashboard/card/PageCard";
import Search from "@/app/ui/dashboard/search/Search";
import Link from "next/link";

const TransactionPage = async ({ searchParams, session }) => {
  const { user } = await auth();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, transactions } = await fetchTransactions(q, page);

  const transactionAmount = await fetchTransactionAmount();
  const transactionCount = await fetchTotalTransactionCount();
  const transactionAmountThisMonth = await fetchMonthTransactionAmount();

  return (
    <div className="global-bg mt-5 p-5 rounded-md">
      <div className="custom-bg mb-5 flex gap-5 justify-between items-center">
        <PageCard title="Overall Transactions" amount={transactionCount} />
        <PageCard
          title="Month Transactions Amount"
          amount={transactionAmountThisMonth}
        />
        <PageCard
          title="Total Transactions Amount"
          amount={`$ ${transactionAmount}`}
        />
      </div>
      <div className="flex justify-between">
        <Search placeholder="Search for transactions...." />
        {user.isAdmin && (
          <Link href="/dashboard/transactions/add">
            <button className="bg-blue-800 text-white px-3 py-2 rounded-md">
              Add Transaction
            </button>
          </Link>
        )}
      </div>
      <div className="thead-bg w-full">
        <div className="custom-bg flex font-bold">
          <div className="flex-1">Invoice No</div>
          <div className="w-[200px]">Transaction Name</div>
          <div className="flex-1">Created at</div>
          <div className="flex-1">Amount</div>
          <div className="flex-1">Status</div>
          {user.isAdmin && <div className="flex-1">Action</div>}
        </div>
        {transactions.length === 0 ? (
          <div className="text-center font-bold text-gray-500 m-10">
            No transactions found.
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center p-4 border-b border-b-gray-600"
            >
              <div className="flex-1">{transaction.invoice}</div>
              <div className="w-[200px]">{transaction.title}</div>
              <div className="flex-1">
                {transaction.createdAt?.toString().slice(4, 16)}
              </div>
              <div className="flex-1">$ {transaction.amount}</div>
              <div className="flex-1">{transaction.status}</div>
              {user.isAdmin && (
                <div className="flex-1 flex gap-3 items-center">
                  <Link href={`/dashboard/transactions/${transaction.id}`}>
                    <button className="bg-green-500 p-2 rounded-md">
                      <MdOutlineModeEdit />
                    </button>
                  </Link>
                  <form action={deleteTransaction}>
                    <input type="hidden" name="id" value={transaction.id} />
                    <button className="bg-red-500 p-2 rounded-md">
                      <MdDelete />
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div></div>
      <Pagination count={count} />
    </div>
  );
};

export default TransactionPage;
