import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const salesData = [
  { name: "Tháng 1", sales: 4200 },
  { name: "Tháng 2", sales: 3800 },
  { name: "Tháng 3", sales: 5100 },
  { name: "Tháng 4", sales: 3900 },
  { name: "Tháng 5", sales: 5200 },
  { name: "Tháng 6", sales: 2300 },
  { name: "Tháng 7", sales: 4200 },
  { name: "Tháng 8", sales: 2800 },
  { name: "Tháng 9", sales: 3600 },
  { name: "Tháng 10", sales: 5900 },
  { name: "Tháng 11", sales: 1000 },
  { name: "Tháng 12", sales: 4200 },
];
const SalesOverviewChart = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Danh số bán hàng</h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={salesData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#4B5563"
            ></CartesianGrid>
            <XAxis dataKey={"name"} />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
