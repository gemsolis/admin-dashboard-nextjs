import PageCard from "@/app/ui/dashboard/card/PageCard";
import RevenueChart from "@/app/ui/dashboard/chart/RevenueChart";

const page = () => {
  return (
    <div className="global-bg mt-10 p-5 rounded-md">
      <div className="custom-bg flex justify-between items-center gap-5">
        <PageCard title="Overall Revenue" amount="$ 12567" />
        <PageCard title="This Month Revenue" amount="$ 2367" />
        <PageCard title="Previous Month Revenue" amount="$ 1567" />
      </div>
      <RevenueChart />
    </div>
  );
};

export default page;
