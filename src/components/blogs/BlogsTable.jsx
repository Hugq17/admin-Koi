import { motion } from "framer-motion";
import { Edit, Search, Timer, Trash2 } from "lucide-react";
import { useState } from "react";

const BLOG_DATA = [
	{ id: 1, title: "Bơm JEBAO LP16000", content: "Nice", createAt:"2023-07-01", authorName: "TienPM"},
	{ id: 2, title: "Bơm JEBAO LP35000", content: "Xử lí nước", createAt: "2023-07-01", authorName: "TienPM"},
	{ id: 3, title: "Cám Nhật Hikari Color Tăng Màu", content: "Thức ăn cho Koi", createAt: "2023-07-02", authorName: "TienPM"},
	{ id: 4, title: "Cám Nhật Hikari tăng trưởng", content: "Thức ăn cho Koi", createAt: "2023-07-02", authorName: "TienPM"},
	{ id: 5, title: "Elbagin Tetra Nhật siêu dưỡng", content: "Phòng trị bệnh", createAt: "2023-07-03", authorName: "TienPM"},
];

const BlogsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredBlogs, setFilteredBlogs] = useState(BLOG_DATA);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = BLOG_DATA.filter(
			(blog) => blog.title.toLowerCase().includes(term) || blog.content.toLowerCase().includes(term)
		);

		setFilteredBlogs(filtered);
	};

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
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Tiêu đề
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Nội dung
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Ngày tạo
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Tác giả
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Thao tác
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredBlogs.map((blog) => (
							<motion.tr
								key={blog.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
									{blog.title}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									
									{blog.content.length > 50 ? blog.content.slice(0, 50) + '...' : blog.content}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{new Intl.DateTimeFormat("vi-VN").format(new Date(blog.createAt))}
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
		</motion.div>
	);
};
export default BlogsTable;