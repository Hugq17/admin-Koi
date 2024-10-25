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
			const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxOGY0ZGY5MmFkMTc1ZjZhMDMwN2FiNjVkOGY2N2YwNTRmYTFlNWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20va29pY2FyZS00NTM4ZSIsImF1ZCI6ImtvaWNhcmUtNDUzOGUiLCJhdXRoX3RpbWUiOjE3Mjk4Mjg2MzAsInVzZXJfaWQiOiJTb3ljb25jd3ZrVFp0VVh3OFZBUVRCeHJaNkMzIiwic3ViIjoiU295Y29uY3d2a1RadFVYdzhWQVFUQnhyWjZDMyIsImlhdCI6MTcyOTgyODYzMCwiZXhwIjoxNzI5ODMyMjMwLCJlbWFpbCI6ImtvaWFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJrb2lhZG1pbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.RQ3OlnRlR3VMSbs9zQsNs55QqCQwTpQE1aozUV1JS_dh931qI4zVJFn1MzRDaB7sSTiRn9vGY6QMWHNao5dqrmGYYqGRzuUifMgbqi-yRKD64FjeyA7bgFdElp-vf3vD3Bvzje_Yoh8SR1Gvhy7j7ZtAx8i4y0GVYZXuxdhMZjg7Fz94Woue4I53ajXqJPvewRYZIESDBkCCzCA3JISWya0zW9w7s3ZMBmTCsfnRFE4UBlR66fPjPkreS_-GXu56FwVOLivfSQq2j2pmH0L1Wm1KNkdTnsUZFhOiO3Ap1-VgoR3QdMY75unH3MKLS3dcoTEhz20jXcm5LtyUNKfOZg";
			try {
				const response = await axios.get('https://koi-care-server.azurewebsites.net/api/account/all-users', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
				});
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
