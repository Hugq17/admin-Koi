import { CheckCircle, Clock, DollarSign, ShoppingBag, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";

const orderStats = {
	totalOrders: "12",
	totalRevenue: "7500000 VNĐ",
};

const OrdersPage = () => {
	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Giao dịch"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Tổng lượt giao dịch' icon={ShoppingCart} value={orderStats.totalOrders} color='#F59E0B' />
					<StatCard name='Tổng doanh thu' icon={DollarSign} value={orderStats.totalRevenue} color='#EF4444' />
				</motion.div>

				{/* <div className='grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8'>
					<DailyOrders />
					<OrderDistribution />
				</div> */}

				<OrdersTable />
			</main>
		</div>
	);
};
export default OrdersPage;