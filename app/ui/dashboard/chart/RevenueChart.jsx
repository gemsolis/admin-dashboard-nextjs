"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Revenue: 4044, Expenses: 1400 },
  { name: "Feb", Revenue: 3530, Expenses: 1398 },
  { name: "Mar", Revenue: 2100, Expenses: 1000 },
  { name: "Apr", Revenue: 3000, Expenses: 1908 },
  { name: "May", Revenue: 2000, Expenses: 1970 },
  { name: "Jun", Revenue: 2500, Expenses: 1800 },
  { name: "Jul", Revenue: 3600, Expenses: 1300 },
  { name: "Aug", Revenue: 3800, Expenses: 1660 },
  { name: "Sep", Revenue: 3600, Expenses: 1400 },
  { name: "Oct", Revenue: 3800, Expenses: 2050 },
  { name: "Nov", Revenue: 5000, Expenses: 2300 },
  { name: "Dec", Revenue: 3800, Expenses: 2200 },
];

const currentYear = new Date().getFullYear();

const RevenueChart = () => {
  return (
    <div className="custom-bg my-10 p-5">
      <h2 className="mb-5 text-lg">Revenue and Expenses ({currentYear})</h2>
      <div className="w-full flex justify-center ">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            className=" pb-10 pt-5 rounded-md"
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 50,
            }}
          >
            <XAxis dataKey="name" stroke="#999999" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Revenue" fill="#c3ffbf" barSize={10} />
            <Bar dataKey="Expenses" fill="#ffa39e" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
