import Link from "next/link";
import { fetchTransactions } from "@/app/lib/data";

const Transactions = async () => {
  const { transactions } = await fetchTransactions();
  return (
    <div className="global-bg rounded-sm p-5">
      <h2 className="text-xl">Latest Transactions</h2>
      <div className="custom-bg w-full my-5">
        <div className="thead-bg flex font-bold p-4">
          <div className="flex-1">Transaction Name</div>
          <div className="flex-1">Created at</div>
          <div className="flex-1">Amount</div>
          <div className="flex-1">Status</div>
        </div>
        {transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center p-4 border-b border-b-gray-600"
          >
            <div className="flex-1">{transaction.title}</div>
            <div className="flex-1">
              {transaction.createdAt?.toString().slice(4, 16)}
            </div>
            <div className="flex-1">$ {transaction.amount}</div>
            <div className="flex-1">{transaction.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
