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
      const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxOGY0ZGY5MmFkMTc1ZjZhMDMwN2FiNjVkOGY2N2YwNTRmYTFlNWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20va29pY2FyZS00NTM4ZSIsImF1ZCI6ImtvaWNhcmUtNDUzOGUiLCJhdXRoX3RpbWUiOjE3Mjk4Mjg2MzAsInVzZXJfaWQiOiJTb3ljb25jd3ZrVFp0VVh3OFZBUVRCeHJaNkMzIiwic3ViIjoiU295Y29uY3d2a1RadFVYdzhWQVFUQnhyWjZDMyIsImlhdCI6MTcyOTgyODYzMCwiZXhwIjoxNzI5ODMyMjMwLCJlbWFpbCI6ImtvaWFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJrb2lhZG1pbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.RQ3OlnRlR3VMSbs9zQsNs55QqCQwTpQE1aozUV1JS_dh931qI4zVJFn1MzRDaB7sSTiRn9vGY6QMWHNao5dqrmGYYqGRzuUifMgbqi-yRKD64FjeyA7bgFdElp-vf3vD3Bvzje_Yoh8SR1Gvhy7j7ZtAx8i4y0GVYZXuxdhMZjg7Fz94Woue4I53ajXqJPvewRYZIESDBkCCzCA3JISWya0zW9w7s3ZMBmTCsfnRFE4UBlR66fPjPkreS_-GXu56FwVOLivfSQq2j2pmH0L1Wm1KNkdTnsUZFhOiO3Ap1-VgoR3QdMY75unH3MKLS3dcoTEhz20jXcm5LtyUNKfOZg";

      try {
        // Gọi từng API để lấy dữ liệu
        const [usersRes, productsRes, blogsRes, ordersRes] = await Promise.all([
          axios.get("https://koi-care-server.azurewebsites.net/api/account/all-users", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get("https://koi-care-server.azurewebsites.net/api/product/get-all", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get("https://koi-care-server.azurewebsites.net/api/blogs/get-all", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get("https://koi-care-server.azurewebsites.net/api/order/get-all", { headers: { Authorization: `Bearer ${token}` }}),
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
