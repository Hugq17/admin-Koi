import { useState, useEffect } from "react";
import { DollarSign, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import OrdersTable from "../components/orders/OrdersTable";

const OrdersPage = () => {
  const [orderStats, setOrderStats] = useState({
    totalOrders: "0",
    totalRevenue: "0 VNĐ",
  });

  const fetchOrderStats = async () => {
    try {
		const token = localStorage.getItem("authToken"); // Ensure the token is saved in localStorage
      const response = await axios.get(
        "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/order/get-all",
		{
		headers: {
			Authorization: `Bearer ${token}`, // Include token in the headers
		  },
		}
      );

      const orders = response.data.orders;

      // Calculate total orders and total revenue
      const totalOrders = orders.length;
      const totalRevenue = orders
        .filter(order => order.isCompleted)
        .reduce((acc, order) => acc + order.total, 0);

      // Update state with formatted values
      setOrderStats({
        totalOrders: totalOrders.toString(),
        totalRevenue: `${totalRevenue.toLocaleString("vi-VN")} VNĐ`,
      });
    } catch (error) {
      console.error("Error fetching order stats:", error);
    }
  };

  useEffect(() => {
    fetchOrderStats();
  }, []);

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Giao dịch"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Tổng lượt giao dịch"
            icon={ShoppingCart}
            value={orderStats.totalOrders}
            color="#F59E0B"
          />
          <StatCard
            name="Tổng doanh thu"
            icon={DollarSign}
            value={orderStats.totalRevenue}
            color="#EF4444"
          />
        </motion.div>

        <OrdersTable />
      </main>
    </div>
  );
};

export default OrdersPage;
