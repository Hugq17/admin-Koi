// OrderDetailPopup.js
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const OrderDetailPopup = ({ orderId, onClose }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderSummary, setOrderSummary] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch order details (product list)
        const detailResponse = await axios.get(
          `https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderDetails(detailResponse.data.orderDetails);

        // Fetch order summary (general order info)
        const summaryResponse = await axios.get(
          "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/order/get-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Find the specific order summary using orderId
        const summary = summaryResponse.data.orders.find(order => order.id === orderId);
        setOrderSummary(summary);
      } catch (error) {
        console.error("Error fetching order details or summary:", error);
      }
    };

    if (orderId) fetchOrderDetails();
  }, [orderId]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-3/4 h-auto max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-gray-100"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold text-gray-100 mb-4">Thông tin đơn hàng</h3>
        {orderSummary && (
          <>
            <p className="text-gray-300">
              <span className="font-semibold">Mã giao dịch:</span> {orderSummary.orderCode}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Tên khách hàng:</span> {orderSummary.customerName}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Số điện thoại:</span> {orderSummary.phoneNumber}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Địa chỉ:</span> {orderSummary.address || "Không có"}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Tổng tiền:</span> {orderSummary.total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Trạng thái:</span>  <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        orderSummary.isCompleted
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {orderSummary.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
                    </span>
            </p>
          </>
        )}
        <table className="w-full mt-4 border border-gray-700 divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">STT</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Tên sản phẩm</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Số lượng</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Giá</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="px-4 py-2 text-gray-300">{index + 1}</td>
                <td className="px-4 py-2 text-gray-300">{item.productName}</td>
                <td className="px-4 py-2 text-gray-300">{item.quantity}</td>
                <td className="px-4 py-2 text-gray-300">
                  {item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrderDetailPopup;
