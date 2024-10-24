import React from "react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import { BarChart2, BookOpen, Package, ShoppingBag, ShoppingCart, Users, Zap } from "lucide-react";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
const OverviewPage = () => {
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
          <StatCard
            name="Thành viên"
            icon={Users}
            value="21"
            color="#EC4899"
          />
            <StatCard
              name="Sản phẩm"
              icon={Package}
              value="15"
              color="#8B5CF6"
            />
          <StatCard
            name="Bài viết"
            icon={BookOpen}
            value="23"
            color="#10B981"
          />
          <StatCard
            name="Giao dịch"
            icon={ShoppingCart}
            value="12"
            color="#F59E0B"
          />
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          {/* <SalesChannelChart /> */}
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
