import { motion } from "framer-motion";
import { useEffect, useState } from "react"; // Thêm useState và useEffect
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { Boxes, Package } from "lucide-react"; // Xóa AlertTriangle, DollarSign, TrendingUp vì không sử dụng
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import ProductsTable from "../components/products/ProductsTable";
import axios from "axios"; // Thêm axios

const ProductsPage = () => {
	const [totalProducts, setTotalProducts] = useState(0);
	const [totalCategories, setTotalCategories] = useState(0);
	const [products, setProducts] = useState([]); // Thêm state cho products

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get('https://koi-care-server.azurewebsites.net/api/product/get-all');
				const productData = response.data.products; // Truy cập vào products
				setProducts(productData); // Lưu trữ sản phẩm

				// Tính tổng sản phẩm
				setTotalProducts(productData.length);

				// Tính tổng danh mục (sử dụng Set để loại bỏ danh mục trùng lặp)
				const categories = new Set(productData.map(product => product.category));
				setTotalCategories(categories.size); // Số lượng danh mục duy nhất
			} catch (error) {
				console.error("Error fetching products: ", error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Sản phẩm' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Tổng sản phẩm' icon={Package} value={totalProducts} color='#6366F1' />
					<StatCard name='Tổng danh mục' icon={Boxes} value={totalCategories} color='#10B981' />
				</motion.div>

				<ProductsTable products={products} /> {/* Truyền products vào ProductsTable */}

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};

export default ProductsPage;
