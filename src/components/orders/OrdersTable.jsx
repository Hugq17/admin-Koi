import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import axios from "axios";

const OrdersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [orders, setOrders] = useState([]);
	const [filteredOrders, setFilteredOrders] = useState([]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get('https://koi-care-server.azurewebsites.net/api/order/get-all');
				setOrders(response.data.orders); // Lưu dữ liệu đơn hàng vào state
				setFilteredOrders(response.data.orders); // Cập nhật danh sách đơn hàng
			} catch (error) {
				console.error("Error fetching orders: ", error);
			}
		};

		fetchOrders();
	}, []);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = orders.filter(
			(order) =>
				order.id.toString().includes(term) || // Chuyển đổi ID thành chuỗi để so sánh
				order.customerName.toLowerCase().includes(term) // Tìm kiếm theo tên khách hàng
		);
		setFilteredOrders(filtered);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Danh sách giao dịch</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Tìm kiếm...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Mã giao dịch
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Tên khách hàng
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Tổng tiền
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Trạng thái
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Ngày mua
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Thao tác
							</th>
						</tr>
					</thead>

					<tbody className='divide divide-gray-700'>
						{filteredOrders.length === 0 ? ( // Kiểm tra xem có đơn hàng nào không
							<tr>
								<td colSpan={6} className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center'>
									Không có giao dịch nào được tìm thấy.
								</td>
							</tr>
						) : (
							filteredOrders.map((order) => (
								<motion.tr
									key={order.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
										{order.id}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
										{order.customerName}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
										${order.total.toFixed(2)} {/* Đảm bảo là số với 2 chữ số thập phân */}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
												order.isCompleted
													? "bg-green-100 text-green-800" // Hoàn thành
													: "bg-red-100 text-red-800" // Chưa hoàn thành
											}`}
										>
											{order.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										{new Intl.DateTimeFormat("vi-VN").format(new Date(order.orderDate))} {/* Định dạng lại ngày */}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
											<Eye size={18} />
										</button>
									</td>
								</motion.tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default OrdersTable;
