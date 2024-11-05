import { motion } from 'framer-motion';
import { Edit, Search, Trash2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import EditProductPopup from './EditProductPopup';
import CreateProductPopup from './CreateProductPopup';

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/product/get-all');
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
      (product) => (product?.name?.toLowerCase() || "").includes(term) || 
                    (product?.category?.toLowerCase() || "").includes(term)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/product/delete/${selectedProduct.id}`);
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      setFilteredProducts(filteredProducts.filter((p) => p.id !== selectedProduct.id));
      setShowDeletePopup(false);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditPopup(true);
  };

  const saveEdit = async (updatedProduct) => {
    try {
      await axios.put(`https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/product/update/${updatedProduct.id}`, updatedProduct);
      setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
      setFilteredProducts(filteredProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const handleCreate = () => {
    setShowCreatePopup(true);
  };

  const saveCreate = async (newProduct) => {
    try {
      const response = await axios.post('https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/product/create', newProduct);
      setProducts([response.data, ...products]);
      setFilteredProducts([response.data, ...filteredProducts]);
      setShowCreatePopup(false);
    } catch (error) {
      console.error("Error creating product: ", error);
    }
  };

  const indexOfLastProduct = currentPage * postsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - postsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / postsPerPage);

  return (
    <motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Danh sách sản phẩm</h2>
        <div className='flex items-center'>
          <button onClick={handleCreate} className='flex items-center text-white bg-blue-500 px-4 py-2 rounded-lg mr-4 hover:bg-blue-600'>
            <Plus size={18} className='mr-2' /> Tạo sản phẩm
          </button>
          <div className='relative'>
            <input
              type='text'
              placeholder='Tìm kiếm sản phẩm...'
              className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2'
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap'>Tên</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap'>Danh mục</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap'>Giá bán</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap'>Mô tả sản phẩm</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap'>Thao tác</th>
            </tr>
          </thead>
          
          <tbody className='divide-y divide-gray-700'>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className='px-6 py-4 text-sm font-medium text-gray-100'>{product.name}</td>
                <td className='px-6 py-4 text-sm text-gray-300'>{product.category}</td>
                <td className='px-6 py-4 text-sm text-gray-300'>{product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td className='px-6 py-4 text-sm text-gray-300'>{product.description}</td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  <button className='text-indigo-400 hover:text-indigo-300 mr-2' onClick={() => handleEdit(product)}><Edit size={18} /></button>
                  <button className='text-red-400 hover:text-red-300' onClick={() => handleDelete(product)}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeletePopup && <DeleteConfirmPopup onClose={() => setShowDeletePopup(false)} onDelete={confirmDelete} />}
      {showEditPopup && <EditProductPopup product={selectedProduct} onClose={() => setShowEditPopup(false)} onSave={saveEdit} />}
      {showCreatePopup && <CreateProductPopup onClose={() => setShowCreatePopup(false)} onSave={saveCreate} />}

      <div className='flex justify-between items-center mt-4'>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='text-gray-400 hover:text-gray-300'>Trước</button>
        <span className='text-gray-100'>Trang {currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className='text-gray-400 hover:text-gray-300'>Kế tiếp</button>
      </div>
    </motion.div>
  );
};

export default ProductsTable;
