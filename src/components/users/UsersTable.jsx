import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from "axios";

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [users, setUsers] = useState([]); 
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1); // Thiết lập trạng thái cho trang hiện tại
	const [postsPerPage] = useState(5); // Thiết lập số lượng bài viết trên mỗi trang

	// Hàm gọi API để lấy danh sách người dùng
	useEffect(() => {
		const fetchUsers = async () => {
			const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxOGY0ZGY5MmFkMTc1ZjZhMDMwN2FiNjVkOGY2N2YwNTRmYTFlNWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20va29pY2FyZS00NTM4ZSIsImF1ZCI6ImtvaWNhcmUtNDUzOGUiLCJhdXRoX3RpbWUiOjE3Mjk4Mjg2MzAsInVzZXJfaWQiOiJTb3ljb25jd3ZrVFp0VVh3OFZBUVRCeHJaNkMzIiwic3ViIjoiU295Y29uY3d2a1RadFVYdzhWQVFUQnhyWjZDMyIsImlhdCI6MTcyOTgyODYzMCwiZXhwIjoxNzI5ODMyMjMwLCJlbWFpbCI6ImtvaWFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJrb2lhZG1pbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.RQ3OlnRlR3VMSbs9zQsNs55QqCQwTpQE1aozUV1JS_dh931qI4zVJFn1MzRDaB7sSTiRn9vGY6QMWHNao5dqrmGYYqGRzuUifMgbqi-yRKD64FjeyA7bgFdElp-vf3vD3Bvzje_Yoh8SR1Gvhy7j7ZtAx8i4y0GVYZXuxdhMZjg7Fz94Woue4I53ajXqJPvewRYZIESDBkCCzCA3JISWya0zW9w7s3ZMBmTCsfnRFE4UBlR66fPjPkreS_-GXu56FwVOLivfSQq2j2pmH0L1Wm1KNkdTnsUZFhOiO3Ap1-VgoR3QdMY75unH3MKLS3dcoTEhz20jXcm5LtyUNKfOZg";
			try {
				const response = await axios.get('https://koi-care-server.azurewebsites.net/api/account/all-users', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
				});
				setUsers(response.data.users);
				setFilteredUsers(response.data.users); // Cập nhật state với dữ liệu từ API
			} catch (error) {
				console.error("Error fetching users: ", error);
			}
		};
	
		fetchUsers(); 
	}, []);

	// Hàm xử lý tìm kiếm
	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = users.filter(
			(user) => user.username.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
		setCurrentPage(1); // Đặt lại trang đầu tiên trên khi tìm kiếm
	};

	// Xử lý phân trang
	const indexOfLastUser = currentPage * postsPerPage; // Mục trang cuối
	const indexOfFirstUser = indexOfLastUser - postsPerPage; // Mục trang đầu
	const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser); // Các bài viết hiện tại dựa trên phân trang

	// Chuyển trang
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Tính tổng số trang
	const totalPages = Math.ceil(filteredUsers.length / postsPerPage);

	return (
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
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Tên</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Email</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Vai trò</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Trạng thái</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Thao tác</th>
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
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>Xem</button>
									<button className='text-red-400 hover:text-red-300'>Chặn</button>
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
	);
};

export default UsersTable;
