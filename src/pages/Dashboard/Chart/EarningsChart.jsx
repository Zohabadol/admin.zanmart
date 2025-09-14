import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const monthlyExamData = [
  { month_name: "January", total_products: 12 },
  { month_name: "February", total_products: 8 },
  { month_name: "March", total_products: 19 },
  { month_name: "April", total_products: 24 },
  { month_name: "May", total_products: 17 },
  { month_name: "June", total_products: 29 },
  { month_name: "July", total_products: 14 },
  { month_name: "August", total_products: 21 },
  { month_name: "September", total_products: 10 },
  { month_name: "October", total_products: 26 },
  { month_name: "November", total_products: 7 },
  { month_name: "December", total_products: 30 },
];

export default function EarningsChart({dashboard}) {
  return (
    <div className="h-[450px] p-3 shadow-md rounded-md dark:bg-darkCard bg-lightCard text-lightTitle dark:text-darkTitle">
      <h2 className="text-lg font-semibold mb-4">Monthly Product Overview</h2>

      <ResponsiveContainer width="100%" >
        <BarChart data={dashboard.latest_exam} barSize={100}>
          <XAxis dataKey="month_name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
         
          {/* <Tooltip /> */}
          <Legend />
          <Bar dataKey="total_products" fill="#3b82f6" name="Total Products" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

