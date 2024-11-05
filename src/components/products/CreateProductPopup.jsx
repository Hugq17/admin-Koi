import React, { useState } from 'react';

const CreateProductPopup = ({ onClose, onSave }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newProduct);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100'>
        <h3 className='text-lg font-semibold mb-4'>Tạo sản phẩm mới</h3>
        <form onSubmit={handleSubmit}>
        <label className="text-gray-400">Tên</label>
          <input
            type='text'
            name='name'
            value={newProduct.name}
            onChange={handleChange}
            className='w-full mb-3 p-2 bg-gray-700 rounded'
          />
          <label className="text-gray-400">Danh mục</label>
          <input
            type='text'
            name='category'
            value={newProduct.category}
            onChange={handleChange}
            className='w-full mb-3 p-2 bg-gray-700 rounded'
          />
          <label className="text-gray-400">Giá bán</label>
          <input
            type='number'
            name='price'
            value={newProduct.price}
            onChange={handleChange}
            className='w-full mb-3 p-2 bg-gray-700 rounded'
          />
          <label className="text-gray-400">Mô tả sản phẩm</label>
          <textarea
            name='description'
            value={newProduct.description}
            onChange={handleChange}
            className='w-full mb-3 p-2 bg-gray-700 rounded h-48 resize-none'
          />
          <div className='flex justify-end'>
            <button type='button' onClick={onClose} className='mr-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded'>Hủy</button>
            <button type='submit' className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded'>Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPopup;
