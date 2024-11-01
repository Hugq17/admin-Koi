import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1); // Thiết lập trạng thái cho trang hiện tại
	const [postsPerPage] = useState(5); // Thiết lập số lượng bài viết trên mỗi trang

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get('https://koi-care-server.azurewebsites.net/api/product/get-all');
				console.log("Fetched products:", response.data);
				setProducts(response.data.products);
				setFilteredProducts(response.data.products);
			} catch (error) {
				console.error("Error fetching products: ", error);
			}
		};

		fetchProducts();
	}, []);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = products.filter(
			(product) => 
				(product?.name?.toLowerCase() || "").includes(term) || 
				(product?.category?.toLowerCase() || "").includes(term)
		);
		setFilteredProducts(filtered);
		setCurrentPage(1); // Đặt lại trang đầu tiên trên khi tìm kiếm
	};

	// Xử lý phân trang
	const indexOfLastProduct = currentPage * postsPerPage; // Mục trang cuối
	const indexOfFirstProduct = indexOfLastProduct - postsPerPage; // Mục trang đầu
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct); // Các bài viết hiện tại dựa trên phân trang
	// Chuyển trang
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Tính tổng số trang
	const totalPages = Math.ceil(filteredProducts.length / postsPerPage);

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Danh sách sản phẩm</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Tìm kiếm sản phẩm...'
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
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Danh mục</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Giá bán</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Miêu tả</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Thao tác</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{currentProducts.length > 0 ? (
							currentProducts.map((product) => (
								<motion.tr
									key={product.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
										<img
											src={product.imageUrl || 'https://via.placeholder.com/150'} // Default image URL if none exists
											alt='Product img'
											className='size-10 rounded-full'
										/>
										{product.name.length > 30 ? `${product.name.slice(0, 30)}...` : product.name}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										{product.category}
									</td>

									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										{product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										{product.description.length > 50 ? `${product.description.slice(0, 50)}...` : product.description}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
											<Edit size={18} />
										</button>
										<button className='text-red-400 hover:text-red-300'>
											<Trash2 size={18} />
										</button>
									</td>
								</motion.tr>
							))
						) : (
							<tr>
								<td colSpan="5" className="text-center text-gray-400 py-4">
									Không có sản phẩm nào được tìm thấy.
								</td>
							</tr>
						)}
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

export default ProductsTable;
