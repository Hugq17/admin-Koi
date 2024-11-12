import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpAz, ArrowDownZa } from "lucide-react";
import axios from "axios";
import ViewUserPopup from "./ViewUserPopup";

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedUser, setSelectedUser] = useState(null); // For popup
	const [postsPerPage] = useState(5);

	// Sort state
	const [sortConfig, setSortConfig] = useState({
		key: "username", // default sort by "Tên"
		direction: "asc", // default ascending
	});

	// Fetch users
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem("authToken");
				const response = await axios.get(
					"https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/account/all-users",
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setUsers(response.data.users);
				setFilteredUsers(response.data.users);
			} catch (error) {
				console.error("Error fetching users: ", error);
			}
		};
		fetchUsers();
	}, []);

	// Search functionality
	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = users.filter(
			(user) =>
				user.username.toLowerCase().includes(term) ||
				user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
		setCurrentPage(1);
	};

	// Sort functionality
	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });

		const sortedUsers = [...filteredUsers].sort((a, b) => {
			if (a[key] < b[key]) {
				return direction === "asc" ? -1 : 1;
			}
			if (a[key] > b[key]) {
				return direction === "asc" ? 1 : -1;
			}
			return 0;
		});
		setFilteredUsers(sortedUsers);
	};

	// Pagination calculations
	const indexOfLastUser = currentPage * postsPerPage;
	const indexOfFirstUser = indexOfLastUser - postsPerPage;
	const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const totalPages = Math.ceil(filteredUsers.length / postsPerPage);

	// Handle Block/Unblock user
	const handleBlockUnblock = async (userId, isActive) => {
		try {
			const token = localStorage.getItem("authToken");
			const response = await axios.put(
				`https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/account/disable/${userId}`,
				{
					id: userId,
					isActive: !isActive, // Toggle between blocking/unblocking
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 200) {
				// Update users list after blocking/unblocking
				setUsers((prevUsers) =>
					prevUsers.map((user) =>
						user.id === userId ? { ...user, isActive: !isActive } : user
					)
				);
				setFilteredUsers((prevUsers) =>
					prevUsers.map((user) =>
						user.id === userId ? { ...user, isActive: !isActive } : user
					)
				);
			}
		} catch (error) {
			console.error("Error blocking/unblocking user:", error);
		}
	};

	return (
		<>
			<motion.div
				className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-semibold text-gray-100'>Tài khoản</h2>
					<div className='relative'>
						<input
							type='text'
							placeholder='Tìm kiếm...'
							className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							onChange={handleSearch}
							value={searchTerm}
						/>
						<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
					</div>
				</div>

				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-700'>
						<thead>
							<tr>
								<th
									className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer'
									onClick={() => handleSort("username")}
								>
									Tên
									{sortConfig.key === "username" && (
										<span className='ml-2'>
											{sortConfig.direction === "asc" ? (
												<ArrowUpAz size={16} />
											) : (
												<ArrowDownZa size={16} />
											)}
										</span>
									)}
								</th>
								<th
									className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer'
									onClick={() => handleSort("email")}
								>
									Email
									{sortConfig.key === "email" && (
										<span className='ml-2'>
											{sortConfig.direction === "asc" ? (
												<ArrowUpAz size={16} />
											) : (
												<ArrowDownZa size={16} />
											)}
										</span>
									)}
								</th>
								<th
									className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer'
									onClick={() => handleSort("roleName")}
								>
									Vai trò
									{sortConfig.key === "roleName" && (
										<span className='ml-2'>
											{sortConfig.direction === "asc" ? (
												<ArrowUpAz size={16} />
											) : (
												<ArrowDownZa size={16} />
											)}
										</span>
									)}
								</th>
								<th
									className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer'
									onClick={() => handleSort("isActive")}
								>
									Trạng thái
									{sortConfig.key === "isActive" && (
										<span className='ml-2'>
											{sortConfig.direction === "asc" ? (
												<ArrowUpAz size={16} />
											) : (
												<ArrowDownZa size={16} />
											)}
										</span>
									)}
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Thao tác
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-700'>
							{currentUsers.map((user) => (
								<motion.tr
									key={user.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='flex items-center'>
											<div className='flex-shrink-0 h-10 w-10'>
												<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
													{user.username.charAt(0)}
												</div>
											</div>
											<div className='ml-4'>
												<div className='text-sm font-medium text-gray-100'>{user.username}</div>
											</div>
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-300'>{user.email}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
											{user.roleName}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"}`}>
											{user.isActive ? "Hoạt động" : "Chặn"}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										<button
											className='text-indigo-400 hover:text-indigo-300 mr-2'
											onClick={() => setSelectedUser(user)}
										>
											Xem
										</button>
										<button
											className={`text-red-400 hover:text-red-300`}
											onClick={() => handleBlockUnblock(user.id, user.isActive)}
										>
											{user.isActive ? "Chặn" : "Bỏ chặn"}
										</button>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
					{/* Kiểm soát phân trang */}
					<div className='flex justify-between items-center mt-4'>
					<button
						className='text-gray-400 hover:text-gray-300 disabled:opacity-50'
						onClick={() => paginate(currentPage - 1)}
						disabled={currentPage === 1}
					>
						Trước
					</button>
					<span className='text-gray-100'>
						Trang {currentPage} / {totalPages}
					</span>
					<button
						className='text-gray-400 hover:text-gray-300 disabled:opacity-50'
						onClick={() => paginate(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						Kế tiếp
					</button>
				</div>
			</motion.div>
			

			{/* View User Popup */}
			{selectedUser && (
				<ViewUserPopup user={selectedUser} onClose={() => setSelectedUser(null)} />
			)}
		</>
	);
};

export default UsersTable;
