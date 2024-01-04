import PageCard from "../ui/dashboard/card/PageCard";
import Chart from "../ui/dashboard/chart/Chart";
import Transactions from "../ui/dashboard/transactions/Transactions";
import {
  fetchTotalTransactionCount,
  fetchTotalUsersCount,
} from "@/app/lib/data";

const Dashboard = async () => {
  const transactionCount = await fetchTotalTransactionCount();
  const usersCount = await fetchTotalUsersCount();
  return (
    <div className="flex my-5 gap-5">
      <div className="flex flex-col gap-5 flex-[3]">
        <div className="flex gap-5 justify-between items-center">
          <PageCard title="Total Users" amount={usersCount} />
          <PageCard title="Total Transactions" amount={transactionCount} />
          <PageCard title="Total Revenue" amount="$ 12567" />
        </div>
        <Transactions />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
