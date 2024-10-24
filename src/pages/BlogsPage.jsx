import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, BookCheck, BookOpen, BookOpenCheck, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import BlogsTable from "../components/blogs/BlogsTable";

const BlogsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Bài viết' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Tổng bài viết' icon={BookOpen} value={24} color='#6366F1' />
					<StatCard name='Bài viết mới' icon={BookOpenCheck} value={5} color='#10B981' />
				</motion.div>

				<BlogsTable />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
				</div>
			</main>
		</div>
	);
};
export default BlogsPage;