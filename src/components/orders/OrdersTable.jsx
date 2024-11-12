import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Eye, ArrowUpAz, ArrowDownZa, ArrowUp01, ArrowDown10 } from "lucide-react";
import axios from "axios";

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: "orderCode", // Default sorting by 'Mã giao dịch'
    direction: "asc", // Default direction ascending
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/order/get-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter(
      (order) =>
        order.orderCode.toString().includes(term) ||
        order.customerName.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (key === "orderDate" || key === "completedAt") {
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      if (key === "total") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredOrders(sortedOrders);
  };

  const indexOfLastOrder = currentPage * postsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - postsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredOrders.length / postsPerPage);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Danh sách giao dịch</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("orderCode")}
              >
                Mã giao dịch
                {sortConfig.key === "orderCode" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? <ArrowUpAz size={16} /> : <ArrowDownZa size={16} />}
                  </span>
                )}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("customerName")}
              >
                Tên khách hàng
                {sortConfig.key === "customerName" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? <ArrowUpAz size={16} /> : <ArrowDownZa size={16} />}
                  </span>
                )}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("total")}
              >
                Tổng tiền
                {sortConfig.key === "total" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? <ArrowUp01 size={16} /> : <ArrowDown10 size={16} />}
                  </span>
                )}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("isCompleted")}
              >
                Trạng thái
                {sortConfig.key === "isCompleted" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? <ArrowUpAz size={16} /> : <ArrowDownZa size={16} />}
                  </span>
                )}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("orderDate")}
              >
                Ngày mua
                {sortConfig.key === "orderDate" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? <ArrowUp01 size={16} /> : <ArrowDown10 size={16} />}
                  </span>
                )}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("completedAt")}
              >
                Ngày giao
                {sortConfig.key === "completedAt" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? <ArrowUp01 size={16} /> : <ArrowDown10 size={16} />}
                  </span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center"
                >
                  Không có giao dịch nào được tìm thấy.
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <motion.tr
                  key={order.orderCode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{order.orderCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{order.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {order.total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.isCompleted
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Intl.DateTimeFormat("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(order.orderDate))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.completedAt
                      ? new Intl.DateTimeFormat("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(order.completedAt))
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Eye size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="text-gray-400 hover:text-gray-300 disabled:opacity-50"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        <span className="text-gray-100">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          className="text-gray-400 hover:text-gray-300 disabled:opacity-50"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Kế tiếp
        </button>
      </div>
    </motion.div>
  );
};

export default OrdersTable;
