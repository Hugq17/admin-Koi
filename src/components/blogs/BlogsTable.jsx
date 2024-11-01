import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const BlogsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [blogs, setBlogs] = useState([]); 
	const [filteredBlogs, setFilteredBlogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1); // Thiết lập trạng thái cho trang hiện tại
	const [postsPerPage] = useState(5); // Thiết lập số lượng bài viết trên mỗi trang

	// Hàm gọi API để lấy danh sách người dùng
	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await axios.get('https://koi-care-server.azurewebsites.net/api/blogs/get-all');
				setBlogs(response.data.blogs); 
				setFilteredBlogs(response.data.blogs); // Cập nhật state với dữ liệu từ API
			} catch (error) {
				console.error("Error fetching blogs: ", error);
			}
		};

		fetchBlogs();
	}, []);

	// Hàm xử lý tìm kiếm
	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = blogs.filter(
			(blog) => blog.title.toLowerCase().includes(term) || blog.authorName.toLowerCase().includes(term)
		);
		setFilteredBlogs(filtered);
		setCurrentPage(1); // Đặt lại trang đầu tiên trên khi tìm kiếm
	};

	// Xử lý phân trang
	const indexOfLastBlog = currentPage * postsPerPage; // Mục trang cuối
	const indexOfFirstBlog = indexOfLastBlog - postsPerPage; // Mục trang đầu
	const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog); // Các bài viết hiện tại dựa trên phân trang

	// Chuyển trang
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Tính tổng số trang
	const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Danh sách bài viết</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Tìm kiếm bài viết...'
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
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Tiêu đề</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Nội dung</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Ngày tạo</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Tác giả</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Thao tác</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{currentBlogs.map((blog) => (
							<motion.tr
								key={blog.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
									{blog.title.length > 30 ? blog.title.slice(0, 30) + '...' : blog.title}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{blog.content.length > 50 ? blog.content.slice(0, 50) + '...' : blog.content}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{new Intl.DateTimeFormat("vi-VN").format(new Date(blog.createdAt))}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{blog.authorName}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300'>
										<Trash2 size={18} />
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
	);
};

export default BlogsTable;
