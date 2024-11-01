import { useState, useEffect } from "react";
import { CheckCircle, Clock, DollarSign, ShoppingBag, ShoppingCart } from "lucide-react";
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
			const response = await axios.get('https://koi-care-server.azurewebsites.net/api/order/get-all');
			const orders = response.data.orders;

			const totalOrders = orders.length; // Tổng số giao dịch
			const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0); // Tổng doanh thu

			setOrderStats({
				totalOrders: totalOrders.toString(),
				totalRevenue: `${totalRevenue.toLocaleString('vi-VN')} VNĐ`, // Định dạng doanh thu
			});
		} catch (error) {
			console.error("Error fetching order stats: ", error);
		}
	};

	useEffect(() => {
		fetchOrderStats();
	}, []);

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

				<OrdersTable />
			</main>
		</div>
	);
};

export default OrdersPage;
