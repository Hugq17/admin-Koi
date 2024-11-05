import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";

const UsersPage = () => {
	const [userStats, setUserStats] = useState({
		totalUsers: 0,
		newUsersThisWeek: 0,
		activeUsers: 0,
		inactiveUsers: 0,
	});
	
	// Hàm gọi API để lấy danh sách người dùng và tính toán các số liệu
	useEffect(() => {
		const fetchUserStats = async () => {
			try {
				// Set up headers with the authentication token
				const token = localStorage.getItem("authToken"); // Ensure the token is saved in localStorage
				const response = await axios.get(
				  "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/account/all-users",
				  {
					headers: {
					  Authorization: `Bearer ${token}`, // Include token in the headers
					},
				  }
				);
				const users = response.data.users;
				
				// Tính toán các số liệu từ dữ liệu trả về
				const totalUsers = users.length;
				const newUsersThisWeek = users.filter((user) => {
					const userCreationDate = new Date(user.createdAt);
					const oneWeekAgo = new Date();
					oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
					return userCreationDate >= oneWeekAgo;
				}).length;
				const activeUsers = users.filter((user) => user.isActive).length;
				const inactiveUsers = users.filter((user) => !user.isActive).length;

				setUserStats({
					totalUsers,
					newUsersThisWeek,
					activeUsers,
					inactiveUsers,
				});
			} catch (error) {
				console.error("Error fetching user stats: ", error);
			}
		};

		fetchUserStats();
	}, []);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Tài khoản' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Thành viên'
						icon={UsersIcon}
						value={userStats.totalUsers.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard
						name='Thành viên mới'
						icon={UserPlus}
						value={userStats.newUsersThisWeek}
						color='#10B981'
					/>
					<StatCard
						name='Đã xác thực'
						icon={UserCheck}
						value={userStats.activeUsers.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard
						name='Chặn'
						icon={UserX}
						value={userStats.inactiveUsers}
						color='#EF4444'
					/>
				</motion.div>

				<UsersTable />
			</main>
		</div>
	);
};

export default UsersPage;
