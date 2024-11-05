import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import { BookOpen, Package, ShoppingCart, Users } from "lucide-react";
import axios from "axios";

import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";

const OverviewPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalBlogs: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Ensure the token is saved in localStorage
        // Gọi từng API để lấy dữ liệu
        const [usersRes, productsRes, blogsRes, ordersRes] = await Promise.all([
          axios.get("https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/account/all-users", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get("https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/product/get-all", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get("https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/blogs/get-all", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get("https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/order/get-all", { headers: { Authorization: `Bearer ${token}` }}),
        ]);

        if (usersRes?.data?.users) {
          setStats((prevState) => ({
            ...prevState,
            totalUsers: usersRes.data.users.length,
          }));
        }

        if (productsRes?.data?.products) {
          setStats((prevState) => ({
            ...prevState,
            totalProducts: productsRes.data.products.length,
          }));
        }

        if (blogsRes?.data?.blogs) {
          setStats((prevState) => ({
            ...prevState,
            totalBlogs: blogsRes.data.blogs.length,
          }));
        }

        if (ordersRes?.data?.orders) {
          setStats((prevState) => ({
            ...prevState,
            totalOrders: ordersRes.data.orders.length,
          }));
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Trang chủ" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Thành viên" icon={Users} value={stats.totalUsers.toLocaleString()} color="#EC4899" />
          <StatCard name="Sản phẩm" icon={Package} value={stats.totalProducts.toLocaleString()} color="#8B5CF6" />
          <StatCard name="Bài viết" icon={BookOpen} value={stats.totalBlogs.toLocaleString()} color="#10B981" />
          <StatCard name="Giao dịch" icon={ShoppingCart} value={stats.totalOrders.toLocaleString()} color="#F59E0B" />
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
